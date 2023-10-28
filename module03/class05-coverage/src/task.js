export default class Task {
  #tasks = new Set()

  save({name,dueAt, fn}) {
    console.log(`task ${name} save and will be executed at ${dueAt.toISOString()}`)

    this.#tasks.add({name, dueAt, fn})
  }
  
  run(everyMs) {
    const intervalId = setInterval(() => {
      const now = new Date()
      
      if(!this.#tasks.size) {
        console.log('tasks finished!')
        clearInterval(intervalId)
        return
      }

      for(const task of this.#tasks) {
        if(task.dueAt <= now) {
          task.fn()
          this.#tasks.delete(task)
        }
      }
    }, everyMs)
  }
}