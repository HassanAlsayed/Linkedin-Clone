/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import "./index.scss";
import { AiOutlinePicture } from "react-icons/ai";

export default function Index({
  isModalOpen,
  setIsModalOpen,
  status,
  setStatus,
  post,
  setUploadImage,
  imagePostUrl,
  setImagePostUrl
}) {
  const handleCancel = () => {
    setIsModalOpen(false);
    setImagePostUrl('');
    setStatus('');
  };

  return (
    <>
      <Modal
        title="Create a post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={post}
            value={status}
          >
            Post
          </Button>,
        ]}
      >
        <textarea
          cols={3}
          rows={3}
          placeholder="what do you want to talk about?"
          className="modal-input"
          onChange={(event) => setStatus(event.target.value)}
        />
        {imagePostUrl?.length > 0 && (
          <img src={imagePostUrl} alt="imagePostUrl" className="preview-image" />
        )}

        <label htmlFor="pic-upload">
          <AiOutlinePicture size={30} className="picture-icon" />
        </label>
        <input
          type="file"
          hidden
          id="pic-upload"
          onChange={() => setUploadImage(event.target.files[0])}
        />
      </Modal>
    </>
  );
}
