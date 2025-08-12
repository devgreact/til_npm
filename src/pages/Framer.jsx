import { motion } from "framer-motion";

function Framer() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "yellowgreen",
          margin: "0 auto",
        }}
      >
        Framer
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.5, backgroundColor: "yellow" }}
        whileTap={{ scale: 0.8, backgroundColor: "red" }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "orange",
          margin: "10px auto",
        }}
      >
        마우스오버
      </motion.div>
      <motion.div
        drag={true}
        dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "hotpink",
          margin: "10px auto",
        }}
      >
        드래그
      </motion.div>
    </>
  );
}

export default Framer;
