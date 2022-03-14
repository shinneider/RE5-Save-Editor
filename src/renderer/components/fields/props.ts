export interface GenericFieldProps {
  /**
   * Children components.
   */
  title: string
  ipcName: string
  ipcSet?: boolean
  type?: React.HTMLInputTypeAttribute
  updateInterval?: Number
}

export interface GenericSelectProps {
  /**
   * Children components.
   */
  title: string
  ipcName: string
  // ipcGet: string
  // ipcSet?: string
  // type?: React.HTMLInputTypeAttribute
  // updateInterval?: Number
}
