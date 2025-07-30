import PwForm from "../components/form/PwForm";

function JoinPage() {
  const formWrap = {
    margin: "0 auto",
    width: "80%",
    background: "#fefefe",
  };
  return (
    <div style={formWrap}>
      <h1>회원가입</h1>
      <div>
        <PwForm />
      </div>
    </div>
  );
}

export default JoinPage;
