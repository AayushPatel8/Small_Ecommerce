import { Button, Modal } from 'antd';


const ErrorModal = () => {
  const [modal, contextHolder] = Modal.useModal();
  const countDown = () => {
    let secondsToGo = 3;
    const instance = modal.error({
      title: 'Invalid Credentials',
    //   content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
    //   instance.update({
    //     content: `This modal will be destroyed after ${secondsToGo} second.`,
    //   });
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };
  return (
    <>
      <Button onClick={countDown}>Open modal to close in 5s</Button>
      {contextHolder}
    </>
  );
};
export default ErrorModal;