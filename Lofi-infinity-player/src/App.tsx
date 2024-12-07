import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import WorkScreen from "./components/screen/WorkScreen";
import Comment from "./components/screen/Comment";

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

function App() {
  // const [isWorking, setIsWorking] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState("");

  // const handleStartWork = () => {
  //   setIsWorking(true);
  // };

  // if (isWorking) {
  //   return <Comment></Comment>
  //   //return <WorkScreen dailyGoal={dailyGoal} />;
  // }

  const NGComments = ["死ね", "バカ", ".exe"];
  const regex = new RegExp(NGComments.join("|"));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value;
    setFormData(text);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    if (formData.match(regex)) {
      alert("ERROR: コメントにNGワードが含まれています");
      return false;
    }

    // エスケープ処理
    const escapedData: string = formData.replace(/</g, "&lt;");
    

    console.log("送信するデータ:", escapedData);
    setSubmitted(true)
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-100 to-white overflow-hidden"
    >
      <div className="z-10 w-full max-w-md items-center justify-between font-mono text-sm">
        <motion.h1
          custom={0}
          variants={popUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold text-center mb-8"
        >
          Work BGM App
        </motion.h1>
        <motion.div
          custom={1}
          variants={popUpVariants}
          initial="hidden"
          animate="visible"
          className="relative flex place-items-center mb-8"
        >
          <img
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert rounded-lg"
            src="/placeholder.svg?height=200&width=200"
            alt="App Thumbnail"
            width={200}
            height={200}
          />
        </motion.div>
        <motion.div
          custom={2}
          variants={popUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <form
           action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfVg1ZIQ_9bl8DCTaHTfLDs3hBikF32FrnyoCxWgwIZ32dJCQ/formResponse"
           target="hidden_iframe"
           method="post"
           onSubmit={(e)=>handleSubmit(e)}
          >
          <label
            htmlFor="dailyGoal"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            今日の目標は何ですか？
          </label>
          <Input
            type="text"
            id="dailyGoal"
            placeholder="目標を入力してください"
            className="w-full"
            name="entry.2011066903"
            required
            value={formData}
            onChange={(e)=>handleChange(e)}
          />
           <motion.div
          custom={3}
          variants={popUpVariants}
          initial="hidden"
          animate="visible"
        >
          <Button className="w-full" type="submit" value="送信">
            作業開始
          </Button>
        </motion.div>
          </form>
        </motion.div>
        <iframe
  onLoad={() => {
    if (submitted) {
      window.location.href = "/bgm"; // リロードを行う
    }
  }}
  id="hidden_iframe"
  name="hidden_iframe"
  style={{ display: "none" }}
></iframe>

       
      </div>
    </motion.main>
  );
}

export default App;
