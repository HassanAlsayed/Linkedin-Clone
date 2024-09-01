/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Button, Modal } from "antd";
import "./index.scss";

export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
}) {
  return (
    <div>
      <Modal
        title="Add a Profile Image"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            disabled={currentImage.name ? false : true}
            key="submit"
            type="primary"
            onClick={uploadImage}
            setModalOpen
          >
            Upload Profile Picture
          </Button>
        ]}
      >
        <div className="image-upload-main">
          <p>{currentImage.name}</p>
          <label className="upload-btn" htmlFor="image-upload">
            Add an Image
          </label>
          <input hidden id="image-upload" type={"file"} onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
}
