// src/components/BackgroundVideo.jsx
import React, { useRef, useEffect, useState } from 'react';

const BackgroundVideo = ({ category }) => {
    // 카테고리별 유튜브 비디오 ID 매핑
    const videoIds = {
        default: 'pSUydWEqKwE', // 기본 비디오 ID
        uniform: 'pSUydWEqKwE', // uniform 비디오 ID (필요에 따라 변경)
        oheshio: 'ft70sAYrFyY', // oheshio 비디오 ID (필요에 따라 변경)
        about: 'ft70sAYrFyY', // about 비디오 ID (필요에 따라 변경)
    };

    // 시작 및 종료 시간 설정 (초 단위)
    const videoTimes = {
        default: { start: 97, end: 180 }, // 기본 비디오 시간 범위
        uniform: { start: 165, end: 180 }, // uniform 비디오 시간 범위
        oheshio: { start: 104, end: 180 }, // oheshio 비디오 시간 범위
        about: { start: 147, end: 180 }, // about 비디오 시간 범위
    };

    // 순환할 카테고리 순서 정의
    const cycleOrder = ['default', 'uniform', 'oheshio', 'about'];

    // 플레이어 레퍼런스 저장
    const playersRef = useRef({});
    const activePlayerIdRef = useRef('player-default');
    const [playersReady, setPlayersReady] = useState(false);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const cycleTimerRef = useRef(null);
    const userInteractionRef = useRef(false);

    // 다음 카테고리로 순환하는 함수
    const cycleToNextCategory = () => {
        if (userInteractionRef.current) return; // 사용자 상호작용 중이면 순환 안함

        setActiveCategoryIndex((prevIndex) => (prevIndex + 1) % cycleOrder.length);
    };

    // 순환 타이머 설정/재설정 함수
    const resetCycleTimer = () => {
        if (cycleTimerRef.current) {
            clearTimeout(cycleTimerRef.current);
        }
        cycleTimerRef.current = setTimeout(cycleToNextCategory, 4000); // 4초 후 다음 카테고리로
    };

    // YouTube API 로드 및 초기화
    useEffect(() => {
        // 이미 API가 로드되었는지 확인
        if (window.YT && window.YT.Player) {
            initializePlayers();
            return;
        }

        // YouTube IFrame API를 비동기로 로드
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
            document.head.appendChild(tag);
        }

        // API가 준비되면 호출될 콜백 함수
        window.onYouTubeIframeAPIReady = initializePlayers;

        // 컴포넌트 언마운트 시 정리
        return () => {
            window.onYouTubeIframeAPIReady = null;
            if (cycleTimerRef.current) {
                clearTimeout(cycleTimerRef.current);
            }

            // 모든 플레이어 정리
            Object.values(playersRef.current).forEach((player) => {
                if (player && typeof player.destroy === 'function') {
                    try {
                        player.destroy();
                    } catch (e) {
                        console.log('Failed to destroy player', e);
                    }
                }
            });
        };
    }, []);

    // 플레이어가 준비되었는지 확인하는 함수
    const isPlayerReady = (key) => {
        return (
            playersRef.current[key] &&
            typeof playersRef.current[key].seekTo === 'function' &&
            typeof playersRef.current[key].playVideo === 'function' &&
            typeof playersRef.current[key].pauseVideo === 'function'
        );
    };

    // 유튜브 플레이어 초기화 함수
    const initializePlayers = () => {
        if (!window.YT || !window.YT.Player) return;

        // 모든 플레이어가 준비되었는지 확인하기 위한 변수
        let allPlayersInitialized = true;
        const readyPlayers = {};

        // 각 카테고리별 플레이어 생성
        Object.keys(videoIds).forEach((key) => {
            const playerId = `player-${key}`;
            const playerElement = document.getElementById(playerId);

            if (playerElement) {
                // 각 카테고리별 플레이어 설정
                const playerConfig = {
                    videoId: videoIds[key],
                    playerVars: {
                        autoplay: key === 'default' ? 1 : 0, // 기본 영상만 자동 재생
                        mute: 1, // 음소거 (자동 재생에 필요)
                        controls: 0, // 컨트롤 숨김
                        showinfo: 0, // 영상 정보 숨김
                        modestbranding: 1, // 유튜브 로고 최소화
                        loop: 1, // 반복 재생
                        playlist: videoIds[key], // 반복 재생에 필요한 플레이리스트
                        disablekb: 1, // 키보드 컨트롤 비활성화
                        fs: 0, // 전체 화면 버튼 숨김
                        rel: 0, // 관련 동영상 숨김
                        iv_load_policy: 3, // 주석 숨김
                        autohide: 1, // 자동으로 컨트롤 숨김
                        playsinline: 1, // 인라인 재생 (모바일용)
                        enablejsapi: 1, // JS API 활성화
                        origin: window.location.origin, // 보안을 위한 오리진 설정
                        start: videoTimes[key].start, // 시작 시간
                        end: videoTimes[key].end, // 종료 시간
                    },
                    events: {
                        onReady: (event) => {
                            readyPlayers[key] = true;
                            // 모든 플레이어가 준비되었으면 상태 업데이트
                            if (Object.keys(readyPlayers).length === Object.keys(videoIds).length) {
                                setPlayersReady(true);
                                // 모든 플레이어가 준비되면 순환 타이머 시작
                                resetCycleTimer();
                            }

                            if (key === 'default') {
                                event.target.mute();
                                event.target.playVideo();
                            }
                        },
                        onStateChange: (event) => {
                            // 영상이 끝나면 다시 재생 (loop 설정 보완)
                            if (event.data === window.YT.PlayerState.ENDED) {
                                event.target.seekTo(videoTimes[key].start);
                                event.target.playVideo();
                            }
                        },
                    },
                };

                try {
                    // 플레이어 생성
                    const player = new window.YT.Player(playerId, playerConfig);
                    playersRef.current[key] = player;
                } catch (e) {
                    console.log(`Failed to create player for ${key}`, e);
                    allPlayersInitialized = false;
                }
            } else {
                allPlayersInitialized = false;
                console.log(`Player element not found for ${key}`);
            }
        });

        // 모든 플레이어 초기화 확인
        if (!allPlayersInitialized) {
            console.log('Not all players were initialized correctly');
        }
    };

    // 외부 카테고리 prop이 변경되면 사용자 상호작용 처리
    useEffect(() => {
        if (category) {
            userInteractionRef.current = true; // 사용자가 카테고리 선택함
        } else {
            userInteractionRef.current = false; // 사용자 상호작용 해제
            resetCycleTimer(); // 타이머 재설정
        }
    }, [category]);

    // 자동 순환 처리
    useEffect(() => {
        if (!playersReady) return;

        // 순환 타이머 재설정
        if (!userInteractionRef.current) {
            resetCycleTimer();
        }
    }, [activeCategoryIndex, playersReady]);

    // 현재 활성 카테고리 결정
    const activeCategory = category || cycleOrder[activeCategoryIndex];

    // 카테고리 변경 시 해당 비디오 표시/숨김 처리
    useEffect(() => {
        // 플레이어가 준비되지 않았으면 실행하지 않음
        if (!playersReady) return;

        let timeoutId;

        // 모든 비디오 컨테이너 숨기기
        Object.keys(videoIds).forEach((key) => {
            const containerId = `video-container-${key}`;
            const container = document.getElementById(containerId);
            if (container) {
                container.style.opacity = '0';
                container.style.zIndex = '0';

                // 현재 활성화된 것이 아니면 일시정지
                if (key !== activeCategory && isPlayerReady(key)) {
                    try {
                        playersRef.current[key].pauseVideo();
                    } catch (e) {
                        console.log(`Failed to pause video for ${key}`, e);
                    }
                }
            }
        });

        // 현재 카테고리에 맞는 비디오 컨테이너 표시
        const currentContainerId = `video-container-${activeCategory}`;
        const currentContainer = document.getElementById(currentContainerId);

        if (currentContainer) {
            // 약간의 지연 후 표시 (부드러운 전환을 위해)
            timeoutId = setTimeout(() => {
                currentContainer.style.opacity = '1';
                currentContainer.style.zIndex = '5';
                activePlayerIdRef.current = `player-${activeCategory}`;

                // 현재 비디오 재생 (플레이어가 준비되었을 때만)
                if (isPlayerReady(activeCategory)) {
                    try {
                        playersRef.current[activeCategory].seekTo(videoTimes[activeCategory].start);
                        playersRef.current[activeCategory].playVideo();
                    } catch (e) {
                        console.log(`Failed to play video for ${activeCategory}`, e);
                    }
                }
            }, 300); // 페이드 아웃 시간과 맞춤
        }

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [activeCategory, playersReady]);

    return (
        <>
            {/* 각 카테고리별 YouTube 비디오 컨테이너 */}
            {Object.keys(videoIds).map((key) => (
                <div
                    key={key}
                    id={`video-container-${key}`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                        key === 'default' ? 'opacity-100 z-5' : 'opacity-0 z-0'
                    }`}
                >
                    {/* 유튜브 영상 비율을 조정하기 위한 컨테이너 */}
                    <div className='relative w-full h-full overflow-hidden'>
                        {/* 실제 유튜브 플레이어 */}
                        <div
                            id={`player-${key}`}
                            className='absolute inset-0 w-[300%] h-[300%] top-[-100%] left-[-100%]'
                        ></div>
                    </div>
                </div>
            ))}

            {/* 비디오 오버레이 */}
            <div className='absolute inset-0 bg-black bg-opacity-40 z-10 pointer-events-none'></div>
        </>
    );
};

export default BackgroundVideo;
