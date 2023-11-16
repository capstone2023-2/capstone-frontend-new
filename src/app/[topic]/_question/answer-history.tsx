"use client";

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  getAnswerHistory,
  AnswerHistoryType,
  GetAnswerHistoryDataType,
} from "@/apis";
import { accessTokenProps, accessTokenState } from "@/store";

// 답안 히스토리
export default function AnswerHistory({
  id,
  topicName,
}: {
  id: number;
  topicName: string;
}) {
  // 상태 관리
  const [data, setData] = useState<GetAnswerHistoryDataType>({
    result: [],
  });
  const accessTokenValue = useRecoilValue(accessTokenState);

  // API를 통해 답안 히스토리 리스트를 받아옵니다.
  useEffect(() => {
    async function getAnswerHistoryWrapper(
      id: number,
      topicName: string,
      accessTokenValue: accessTokenProps
    ) {
      const answerHistoryListData = await getAnswerHistory({
        questionId: id,
        topic: topicName,
        accessTokenValue: accessTokenValue,
      });

      if (answerHistoryListData) {
        setData(answerHistoryListData);
      }
    }

    getAnswerHistoryWrapper(id, topicName, accessTokenValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vbox gap(4) py(4)">
      <p className="paragraph text-small c(--content-secondary)">
        답안 히스토리
      </p>
      <div className="vbox gap(8) py(4)">
        {data.result?.length == 0 ? (
          <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
            현재 히스토리가 없습니다.
          </p>
        ) : (
          data.result?.map((answerHistory) => {
            return (
              <div
                key={`${topicName}/${id}/${answerHistory.createdAt}`}
                className="vbox py(4)"
              >
                <p className="paragraph text-medium c(--primary) line-height(1.5) pre-line">
                  {answerHistory.answer}
                </p>
                <p className="paragraph text-small c(--content-secondary)">
                  {`${answerHistory.createdAt.substring(
                    0,
                    answerHistory.createdAt.indexOf("T")
                  )}  ${answerHistory.createdAt.substring(
                    answerHistory.createdAt.indexOf("T") + 1,
                    answerHistory.createdAt.indexOf(".")
                  )}`}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
