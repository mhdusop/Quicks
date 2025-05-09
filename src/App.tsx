import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ButtonQuicks from "@/components/common/ButtonQuicks"
import ButtonTaks from "@/components/common/ButtonTaks"
import ButtonInbox from "@/components/common/ButtonInbox"

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-0 right-0 p-5">
      <div className="flex gap-5 items-end">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="inbox"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.1 }}
              >
                <ButtonInbox />
              </motion.div>
              <motion.div
                key="task"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.1 }}
              >
                <ButtonTaks />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <ButtonQuicks onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  )
}

export default App
