import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ButtonQuicks from "@/components/common/button/ButtonQuicks"
import ButtonTasks from "./components/common/button/ButtonTasks"
import ButtonInbox from "@/components/common/button/ButtonInbox"
import CardInbox from "./components/widgets/inbox/CardInbox"
import type { Group } from "./interface/group"
import CardTasks from "./components/widgets/task/CardTasks"

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isInboxActive, setIsInboxActive] = useState(false)
  const [isTaskActive, setIsTaskActive] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  return (
    <div className="w-full h-screen flex flex-col items-end justify-end p-5">
      {isInboxActive && (
        <CardInbox
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          setIsInboxActive={setIsInboxActive}
        />
      )}
      {isTaskActive && (
        <CardTasks />
      )}
      <div className="flex gap-3 items-end p-5">
        <AnimatePresence>
          {isOpen && (
            <div className={`flex flex-row items-center gap-3 ${isTaskActive ? "flex-row-reverse gap-0" : ""}`}>
              <motion.div
                key="task"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.1 }}
              >
                <ButtonTasks
                  isHide={isInboxActive || isTaskActive}
                  isActive={isTaskActive}
                  onClick={() => {
                    setIsTaskActive((prev) => {
                      if (!prev) setIsInboxActive(false)
                      return !prev
                    })
                  }}
                />
              </motion.div>
              <motion.div
                key="inbox"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.1 }}
              >
                <ButtonInbox
                  isHide={isInboxActive || isTaskActive}
                  isActive={isInboxActive}
                  onClick={() => {
                    setIsInboxActive((prev) => {
                      if (!prev) setIsTaskActive(false)
                      return !prev
                    })
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {!isInboxActive && !isTaskActive && (
          <ButtonQuicks onClick={() => setIsOpen(!isOpen)} />
        )}
      </div>
    </div >
  )
}

export default App
