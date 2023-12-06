import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { recordedVideoUrlState } from "@/store";

// 녹화된 영상을 재생하는 컴포넌트
export default function RecordedVideo() {
  const [recordedVideoUrl, setRecordedVideoUrl] = useRecoilState(
    recordedVideoUrlState
  );

  useEffect(() => {
    // 녹화된 영상의 사용이 끝나면, 초기화시키면서 메모리 누수를 방지합니다.
    return () => {
      URL.revokeObjectURL(recordedVideoUrl);
      setRecordedVideoUrl("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vbox w(100%) gap(4)">
      <video
        className="r(12)"
        src={recordedVideoUrl}
        controls
        autoPlay
        suppressHydrationWarning
      />
      <p className="paragraph text-small c(--primary) text-left">녹화본</p>
    </div>
  );
}
