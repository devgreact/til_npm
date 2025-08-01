import { useState } from "react";

function App() {
  // 사용자의 기분을 글로써 입력하는 state
  const [mood, setMood] = useState("");

  // OpenAI 에서 분석한 내용 출력 state
  const [analysis, setAnalysis] = useState("");

  // 분석하는 비동기로 진행이 됨. 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // 사용자가 form 에 입력한 내용을 submit 했을 때 실행됨.
  // 비동기로 진행되므로 async .... await... 사용함.

  const handleSubmit = async e => {
    e.preventDefault(); // 웹브라우저 새로고침 방지

    // 감정을 입력하지 않은 공백 상태라면 함수를 종료
    if (!mood.trim()) return;

    // 로딩창을 보여줌.
    setIsLoading(true);
    // 기존 분석글을 공백으로 출력
    setAnalysis("");

    try {
      // fetch 로 데이터를 전달 즉, request 하고, response 대기
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST", // 글을 보냈다.
          // 옵션들
          // 답변의 길이를 제한함. 500 이상이면 긴 답변
          max_tokens: 500,
          // 창의적인 답변
          // 0 에 가까울수로 딱딱하고 정확한 표현
          // 1 에 가까울수로 부드럽고 창의적 표현
          // 2 에 가까울수로 자유롭고 어뚱한 표현
          temperature: 2,
          // 확률선택
          // 1 : 모든 단어 중에서 고름
          // 0.5 : 확륭이 높은 단어 몇 개 중에서만 고름
          top_p: 1,
          // 몇 개의 답을 할지
          // 3 가지 스타일의 답변을 준다.
          n: 3,
          // 새로운 주제를 GPT 가 제시할지 말지 주는 점수
          presence_penalty: 2.0,
          // 반복 방지로서 동일한 단어가 계속 반복되지 않도록 제어
          frequency_penalty: 0.5,

          // 아래 항목은 어떠한 형태로 내용을 보냈다.
          headers: {
            "Content-Type": "application/json", // JSON 형태이다.
            // 나의 자격 증명으로서 허가된 키로 요청한다.
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          // 아래는 실제로 보낼 내용
          // JSON.stringify: JSON 글자로 변환한다.
          body: JSON.stringify({
            // ChatGPT 의 엔진 종류
            // : gpt-3.5-turbo(빠르고 저렴)
            // : gpt-4(더 똑똑하고 이해력 높음 - 복잡한 문제 해결)
            // : gpt-o(텍스트, 이미지, 음성까지 처리 - 사진으로 설명)
            model: "gpt-3.5-turbo",
            // 필요로 한 프롬프트를 전달함
            messages: [
              {
                role: "system", // ChatGPT 역할 부여
                content:
                  "당신은 감정 분석 전문가입니다. 사용자의 기분을 분석하고 따뜻하고 건설적인 조언을 제공해주세요. 한국어로 답변해주세요.",
              },
              {
                role: "user", // 사용자 입력내용을 작성해줌.
                content: `한글로 답변을 주는 분석으로 해줘. 다음과 같은 기분을 분석해주세요: "${mood}"`,
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await response.json();
      setAnalysis(data.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
      setAnalysis(
        "죄송합니다. 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>💭 기분 분석 서비스</h1>
        <p>현재 기분을 입력하면 AI가 분석해드려요</p>
      </header>

      <div className="mood-container">
        <form onSubmit={handleSubmit} className="mood-form">
          <div className="input-group">
            <label htmlFor="mood-input">
              현재 기분을 자유롭게 표현해주세요:
            </label>
            <textarea
              id="mood-input"
              value={mood}
              onChange={e => setMood(e.target.value)}
              placeholder="예: 오늘 회사에서 상사한테 혼났는데, 집에 와서도 계속 신경 쓰여요..."
              disabled={isLoading}
              rows="4"
            />
          </div>
          <button type="submit" disabled={isLoading || !mood.trim()}>
            {isLoading ? "분석 중..." : "기분 분석하기"}
          </button>
        </form>

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>AI가 당신의 기분을 분석하고 있어요...</p>
          </div>
        )}

        {analysis && !isLoading && (
          <div className="analysis-result">
            <h3>📊 기분 분석 결과</h3>
            <div className="analysis-content">
              {analysis.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
