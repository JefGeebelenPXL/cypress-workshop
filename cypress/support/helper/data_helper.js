// data helper class to change a datatable to a map
class data_helper {
  toMap(table) {
    return new Map(table.rawTable)
  }
}

export default new data_helper()
