import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface Comment {
  タイムスタンプ: string; // Timestamp
  コメントを入力してください: string; // Comment
}

function CommentGet() {
  const [datas, setDatas] = useState<Comment[]>([]);
  const docId = import.meta.env.VITE_GOOGLE_SHEETS_DOC_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

  const containerRef = useRef<HTMLDivElement>(null);

  const CsvDic = (props: string[][]) => {
    const [header, ...rows] = props;
    return rows.map((row) =>
      row.reduce((acc, cell, i) => ({ ...acc, [header[i]]: cell }), {})
    );
  };

  useEffect(() => {
    // Google Sheetsからデータを取得
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${apiKey}/values/sheet1?key=${docId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDatas(CsvDic(data.values));
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
      });
  }, [docId, apiKey]);
  useEffect(() => {
    if (datas.length > 0 && containerRef.current) {
      // datasがセットされたらコメント要素を作成して流す処理を開始
      datas.forEach((item, index) => {
        createScrollingComment(
          item.コメントを入力してください || "なし",
          index
        );
      });
    }
  }, [datas]);

  const createScrollingComment = (text: string, index: number) => {
    if (!containerRef.current) return;

    const divText = document.createElement("div");
    divText.textContent = text;
    divText.style.position = "absolute";
    divText.style.whiteSpace = "nowrap";

    // 画面外（右端）の初期位置を設定
    // コメントコンテナの幅や高さを取得
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    divText.style.left = `${containerWidth}px`;

    // top位置をランダムで決定（コメントが重ならないよう工夫が必要なら座標計算を行う）
    const randomTop = Math.random() * (containerHeight - 20);
    divText.style.top = `${randomTop}px`;

    containerRef.current.appendChild(divText);

    // gsapで右→左へアニメーション
    // 全体横幅 + 要素幅分だけ左へ移動させれば画面外へ消える
    const totalMove = containerWidth + divText.clientWidth;
    gsap.to(divText, {
      x: -totalMove,
      duration: 5 + 10 / text.length, // アニメーション速度はお好みで
      ease: "linear",
      onComplete: () => {
        // アニメーションが終わったら要素を削除
        divText.remove();
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden p-10"
      style={{
        width: "100%",
        height: "100%",
        // background: "#000" // 背景色はお好みで
      }}
    >
      {/* ここに流れるコメントがappendChildで挿入される */}
    </div>
  );
}

export default CommentGet;
