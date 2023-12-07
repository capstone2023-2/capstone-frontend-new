import { useSetRecoilState } from "recoil";
import { interviewProgressState } from "@/store";

export default function Ready() {
  const setInterviewProgress = useSetRecoilState(interviewProgressState);

  return (
    <div className="vbox(center) gap(12)">
      <button
        className="w(50) h(50) label text-large b(2/solid/--primary) c(--primary) r(50%) transtion(all=0.25s) hover:b(2/solid/--accent)+c(--accent)"
        onClick={() => {
          setInterviewProgress({
            progress: "working",
          });
        }}
      >
        ▶️
      </button>
      <div className="vbox(center)">
        <p className="paragraph text-medium c(--primary) letter-spacing(-0.5px)">
          카메라가 보이는지, 말했을 때 본인의 목소리가 들리는지 확인해주세요.
        </p>
        <p className="paragraph text-medium c(--primary) letter-spacing(-0.5px)">
          상단의 진행 버튼을 누르시면 질문이 재생되며 모의 면접이 시작됩니다.
        </p>
      </div>
    </div>
  );
}
