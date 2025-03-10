import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type, content) => {
  switch (type) {
    case 'liked':
      toast.success(`"${content.title || content.name}"를 찜 목록에 추가했습니다`, {
        position: 'bottom-right',
        icon: '❤️',
        autoClose: 3000,
      });
      break;

    case 'unliked':
      toast.info(`"${content.title || content.name}"를 찜 목록에서 제거했습니다`, {
        position: 'bottom-right',
        icon: '💔',
        autoClose: 3000,
      });
      break;

    case 'download':
      toast.info(`"${content.title || content.name}" 다운로드를 시작합니다`, {
        position: 'bottom-right',
        icon: '⬇️',
        autoClose: 3000,
      });
      break;

    case 'review':
      toast.success(`"${content.title || content.name}"에 리뷰를 작성했습니다`, {
        position: 'bottom-right',
        icon: '✍️',
        autoClose: 3000,
      });
      break;

    case 'error':
      toast.error(`오류가 발생했습니다: ${content.message}`, {
        position: 'bottom-right',
        autoClose: 4000,
      });
      break;
    case 'info':
      toast.info(`${content.message}`, {
        position: 'bottom-right',
        icon: 'ℹ️',
        autoClose: 3000,
      });
      break;
    case 'centerInfo':
      toast.info(`${content.message}`, {
        position: 'top-center',
        icon: 'ℹ️',
        autoClose: 3000,
      });
      break;
    case 'centerSuccess':
      toast.success(`"${content.message}`, {
        position: 'top-center',
        icon: '✅',
        autoClose: 3000,
      });
      break;
    case 'couponIssued':
      toast.success(`"${content.title}" 쿠폰이 발급되었습니다`, {
        position: content.center ? 'top-center' : 'bottom-right',
        icon: '🎟️',
        autoClose: 3000,
      });
      break;
    case 'auth':
      toast.success(`${content.message}`, {
        position: 'top-center',
        icon: 'ℹ️',
        autoClose: 3000,
      });
      break;
    case 'logout':
      toast.success(`${content.title}이 완료 되었습니다.`, {
        position: 'top-center',
        icon: 'ℹ️',
        autoClose: 3000,
      });
      break;
    default:
      toast(`"${content.title || content.name}"에 대한 알림`, {
        position: 'bottom-right',
        icon: '🔔',
        autoClose: 3000,
      });
  }
};
