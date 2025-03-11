import DaumPostcodeEmbed from 'react-daum-postcode';
import { IoCloseOutline } from 'react-icons/io5';

const PostcodeModal = ({ onClose, onComplete }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000] !mt-0"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-end gap-3 rounded-lg bg-white px-4 py-6 w-[90%] min-w-[320px] max-w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>
          <IoCloseOutline size={32} />
        </button>
        <DaumPostcodeEmbed
          onComplete={onComplete}
          style={{
            width: '100%',
            height: '50vh',
          }}
        />
      </div>
    </div>
  );
};

export default PostcodeModal;
