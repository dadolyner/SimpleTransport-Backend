// Helper function that gets query as parameter and return proper TypeORM filters
export const AndQueryFilters = (Query: string): [string, object] => {
    const primaryKeys: string[] = Object.keys(Query)
    const primaryValues: string[] = Object.values(Query)
    const lastKeys: string[] = primaryKeys.map(key => { return key.split('.').pop() })

    const filter: string = primaryKeys.map((key, index) => { return `${key} = :${lastKeys[index]}` }).join(' AND ')
    const object: object = primaryKeys.map((key, index) => { return { [lastKeys[index]]: primaryValues[index] } }).reduce((key, value) => Object.assign(key, value), {})

    return [filter, object]
}

// OR FILTERS -> .where("model.model = :model1 OR model.model = :model2", { model1: "R8", model2: "Divo" })