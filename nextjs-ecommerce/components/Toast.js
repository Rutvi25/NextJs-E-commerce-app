const Toast = ({ message, handleShow, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
    >
      <div className={`toast-header text-light ${bgColor}`}>
        <strong className="mr-auto text-light">{message.title}</strong>
        <button
          type="button"
          className="ml-2 mb-1 close text-light"
          data-dismiss="toast"
          style={{ outline: "none" }}
          onClick={handleShow}
        >
          x
        </button>
      </div>
      <div className="toast-body">{message.message}</div>
    </div>
  );
};

export default Toast;
