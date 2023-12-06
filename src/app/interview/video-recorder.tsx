"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { interviewProgressState, recordedVideoUrlState } from "@/store";

// 비디오 레코더 컴포넌트
export default function VideoRecorder({
  muteVideo = false,
}: {
  muteVideo?: boolean;
}) {
  // 상태 관리
  const [interviewProgress, setInterviewProgress] = useRecoilState(
    interviewProgressState
  ); // 모의 면접 단계
  const setRecordedVideoUrl = useSetRecoilState(recordedVideoUrlState); // 녹화된 비디오

  // 실시간 비디오 및 녹화
  const videoRef = useRef<HTMLVideoElement>(null); // 실시간 비디오 (<video>)
  const videoStreamRef = useRef<MediaStream>(); // MediaStream
  const mediaRecorder = useRef<MediaRecorder | null>(null); // MediaRecorder using MediaStream
  const videoChunks = useRef<Blob[]>([]); // 녹화되는 데이터들

  // To Fix Hydartion Issue
  // Reference to https://nextjs.org/docs/messages/react-hydration-error
  const [showRealtimeVideo, setShowRealtimeVideo] = useState<boolean>(false);

  // 미디어 권한을 허용받고, 녹화를 시작합니다.
  const getMediaPermission = useCallback(async () => {
    try {
      // 이미 레코더나 녹화된 영상들의 정보가 있다면 초기화합니다.
      if (mediaRecorder.current) {
        mediaRecorder.current = null;
      }
      if (videoChunks.current.length != 0) {
        videoChunks.current = [];
      }

      // 오디오와 비디오 설정을 전부 허용하도록 한 후, 스트림을 생성합니다.
      const videoConstraints = { audio: true, video: true };
      videoStreamRef.current =
        await navigator.mediaDevices.getUserMedia(videoConstraints);

      if (videoRef.current) {
        videoRef.current.srcObject = videoStreamRef.current;
      }

      // 권한을 허용받으면 모의 면접 단계를 "Ready"로 변경합니다.
      setInterviewProgress({
        progress: "ready",
      });

      // MediaStream을 통해 MediaRecorder를 생성합니다.
      mediaRecorder.current = new MediaRecorder(videoStreamRef.current, {
        mimeType: "video/webm",
      });

      // 녹화가 시작하면, videoChunks.current에 데이터를 저장합니다.
      mediaRecorder.current.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) {
          videoChunks.current.push(ev.data);
        }
      };

      // 녹화가 중지될 때, Blob 배열을 통해 비디오 데이터와 URL을 생성하고,
      // 모의 면접 단계를 "Processing"으로 변경하며 URL을 전역 상태로 설정합니다.
      mediaRecorder.current.onstop = () => {
        // 녹화된 영상을 생성합니다.
        const videoRecorded = new Blob(videoChunks.current, {
          type: "video/webm",
        });

        // URL을 생성 및 전역 상태로 설정합니다.
        setRecordedVideoUrl(URL.createObjectURL(videoRecorded));

        // 모의 면접 단계를 그 다음 단계인 "Processing"으로 변경합니다.
        setInterviewProgress({
          progress: "processing",
        });

        // 설정되어 있는 모든 스트림을 초기화합니다.
        // 녹화를 담당하는 mediaRecorder와, 오디오 및 비디오 전반을 담당하는 videoStream을 초기화해야 합니다.
        mediaRecorder.current = null;
        videoStreamRef.current!.getTracks().forEach((track) => track.stop());
      };
    } catch (err) {
      // 에러 발생 시 (권한 거부 등) 콘솔에 해당 에러를 출력합니다.
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 컴포넌트가 처음 Mount될 때, 즉 오디오와 비디오를 사용해야 할 때 권한을 허용받고 스트림과 레코더를 설정합니다.
    setShowRealtimeVideo(true);
    getMediaPermission();

    return () => {
      // 해당 컴포넌트가 모종의 이유로 Unmount될 때 설정되어 있는 모든 스트림을 초기화합니다.
      // 녹화를 담당하는 mediaRecorder와, 오디오 및 비디오 전반을 담당하는 videoStream을 초기화해야 합니다.
      if (mediaRecorder.current) {
        mediaRecorder.current = null;
      }
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 모의 면접 단계가 변경됨에 따라 비디오 레코더의 동작 방식을 변경합니다.
    switch (interviewProgress.progress) {
      case "working":
        // 모의 면접이 시작될 때 녹화를 시작합니다.
        if (mediaRecorder.current) {
          mediaRecorder.current.start();
        }
        break;
      case "finishRecording":
        // 모의 면접이 종료될 때 녹화를 중지합니다.
        if (mediaRecorder.current) {
          mediaRecorder.current.stop();
        }
        break;
    }
  }, [setInterviewProgress, interviewProgress]);

  return (
    <div className="vbox(center) w(100%)">
      {
        // 현재 녹화되고 있는 비디오와 오디오를 실시간으로 출력하는 컴포넌트
        showRealtimeVideo ? (
          muteVideo ? (
            <video
              className="r(12)"
              ref={videoRef}
              muted
              autoPlay
              suppressHydrationWarning
            />
          ) : (
            <video
              className="r(12)"
              ref={videoRef}
              autoPlay
              suppressHydrationWarning
            />
          )
        ) : (
          <></>
        )
      }
    </div>
  );
}
