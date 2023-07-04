const isEnableLogPerformance = process.env['disableLogPerformance'] === '1';

export const startPerformance = (label: string) => {
  console.time(label)
  return {
    end: () => console.timeEnd(label),
    log: (...data: any[]) => console.timeLog(label, data)
  }
}

