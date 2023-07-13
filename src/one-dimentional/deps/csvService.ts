import { writeFile } from 'fs'

import { CsvContent, ICsvService } from '../useCases/usecase.deps'

export class CsvService implements ICsvService {
  constructor() {}

  public createFile(filename: string, content: CsvContent): void {
    const header = Object.keys(content.header).join(',') + '\n'
    const rows = content.data
      .map(obj => Object.values(obj).join(','))
      .join('\n')
    const csvData = header + rows

    writeFile(filename, csvData, (err: unknown) => {
      if (err) {
        console.error('Error writing CSV file:', err)
      } else {
        console.log(`CSV file "${filename}" created successfully.`)
      }
    })
  }
}
