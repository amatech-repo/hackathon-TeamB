import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const bgmList = [
  "/bgm1.mp3",
  "/bgm2.mp3",
  "/bgm3.mp3",
  // 必要に応じてBGMファイルを追加
];

const popUpVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: custom * 0.2,
    },
  }),
};

export default function WorkScreen({ dailyGoal }: { dailyGoal: string }) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const randomBgm = bgmList[Math.floor(Math.random() * bgmList.length)];
    const newAudio = new Audio(randomBgm);
    newAudio.loop = true;
    newAudio.play();
    setAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.pause();
        newAudio.currentTime = 0;
      }
    };
  }, []);

  const handleStopWork = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    // 通常はタイトル画面に戻る処理を行いますが、
    // 簡単のため、ここではページをリロードします
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-green-100 to-white"
    >
      <motion.h1
        custom={0}
        variants={popUpVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold text-center mb-8"
      >
        作業中
      </motion.h1>
      <motion.p
        custom={1}
        variants={popUpVariants}
        initial="hidden"
        animate="visible"
        className="text-xl mb-8"
      >
        目標: {dailyGoal}
      </motion.p>
      <motion.div
        custom={2}
        variants={popUpVariants}
        initial="hidden"
        animate="visible"
      >
        <Button
          onClick={handleStopWork}
          className="bg-red-500 hover:bg-red-600"
        >
          作業終了
        </Button>
      </motion.div>
    </motion.div>
  );
}
