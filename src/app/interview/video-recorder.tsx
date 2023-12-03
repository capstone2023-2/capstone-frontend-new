"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// 비디오 레코더 컴포넌트
export default function VideoRecorder({ showRealtime = false }: { showRealtime?: boolean }) {
  // 실시간 비디오 및 녹화
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRecordedRef = useRef<HTMLVideoElement>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const videoChunks = useRef<Blob[]>([]);

  // To Fix Hydartion Issue
  // Reference to https://nextjs.org/docs/messages/react-hydration-error
  const [showRealtimeVideo, setShowRealtimeVideo] = useState<boolean>(false);

  // 녹화된 비디오
  const [showVideoRecorded, setShowVideoRecorded] = useState<boolean>(false);
  let videoRecordedUrl = useRef<string>("");

  // 미디어 권한을 허용받고, 녹화를 시작합니다.
  const getMediaPermission = useCallback(async () => {
    try {
      const videoConstraints = { audio: false, video: true };
      const videoStream =
        await navigator.mediaDevices.getUserMedia(videoConstraints);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }

      // MediaStream을 통해 MediaRecorder를 생성
      const recorder = new MediaRecorder(videoStream, {
        mimeType: "video/webm",
      });

      // 데이터가 있다면 Blob 배열에 추가
      recorder.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) {
          videoChunks.current.push(ev.data);
        }
      };

      // 녹화가 중지될 때, Blob 배열을 통해 비디오 데이터와 URL을 생성
      recorder.onstop = () => {
        const videoRecorded = new Blob(videoChunks.current, {
          type: "video/webm",
        });
        videoRecordedUrl.current = URL.createObjectURL(videoRecorded);

        if (videoRecordedRef.current) {
          videoRecordedRef.current.src = videoRecordedUrl.current;
        }
      };

      mediaRecorder.current = recorder;

      // 녹화를 시작
      mediaRecorder.current.start();
    } catch (err) {
      // 에러 발생 시 (권한 거부 등) 콘솔에 해당 에러를 출력
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setShowRealtimeVideo(showRealtime);
    getMediaPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vbox w(100%)">
      {
        // 현재 녹화되고 있는 비디오와 오디오를 실시간으로 출력하는 컴포넌트
        showRealtimeVideo ? (
          <video className="r(12)" ref={videoRef} autoPlay suppressHydrationWarning />
        ) : (
          <></>
        )
      }
      {
        // 녹화가 중지된 후, 녹화된 비디오와 오디오를 보여주는 컴포넌트
        showVideoRecorded ? (
          <video
            className="r(12)"
            ref={videoRecordedRef}
            controls
            suppressHydrationWarning
          />
        ) : (
          <></>
        )
      }
      <button
        onClick={() => {
          mediaRecorder.current?.stop();
          setShowVideoRecorded(true);
        }}
        className="c(--primary)"
      >
        녹화 종료
      </button>
    </div>
  );
}
