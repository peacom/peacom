const isEnableLogPerformance = process.env['disableLogPerformance'] === '1';

export const startPerformance = (label: string) => {
  if (isEnableLogPerformance) {
    console.time(label)
  }

  return {
    end: () => {
      if (isEnableLogPerformance) {
        console.timeEnd(label)
      }
    },
    log: (...data: any[]) => {
      if (isEnableLogPerformance) {
        console.timeLog(label, data)
      }
    }
  }
}

