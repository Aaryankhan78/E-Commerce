import PageWrapper from "../components/PageWrapper";

const Success = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600">
          Thank you for your order. A confirmation email will be sent to you shortly.
        </p>
      </div>
    </PageWrapper>
  );
};

export default Success;
