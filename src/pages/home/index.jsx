import { useSelector } from 'react-redux';

const Home = () => {
  const { authed, currentUser } = useSelector((state) => state.authR);
  const { username, userId } = currentUser;
  return (
    <div>
      {authed ? (
        <p>
          로그인성공 {username} <br /> {userId}
        </p>
      ) : (
        <p>실패</p>
      )}
    </div>
  );
};

export default Home;
