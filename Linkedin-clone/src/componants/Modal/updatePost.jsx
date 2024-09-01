/* eslint-disable react/prop-types */
import { Button, Modal } from 'antd';
import './index.scss'
import { AiOutlinePicture } from 'react-icons/ai';

export default function UpdatePost ({isModalOpen,setIsModalOpen,status,setStatus,editPost,PostImage,postUrl}) {
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title="Update a post" open={isModalOpen}
       onCancel={handleCancel}
       footer={[
        <Button key="submit" type='primary' disabled={status === status ? false : true} onClick={editPost}>
            Update
        </Button>
       ]}
       >
      <textarea
          cols={3}
          rows={3}
          value={status}
          className="modal-input"
          onChange={(event) => setStatus(event.target.value)}
        />
        {postUrl?.length > 0 && (
          <img src={postUrl} alt="imagePostUrl" className="preview-image" />
        )}

        <label htmlFor="pic-upload">
          <AiOutlinePicture size={30} className="picture-icon" />
        </label>
        <input
          type="file"
          hidden
          id="pic-upload"
          onChange={(event) => PostImage(event.target.files[0])}
        />

      </Modal>
    </>
  );
}

