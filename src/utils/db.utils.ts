import { SelectQueryBuilder } from 'typeorm'

export function createQBCondition<T>(queryBuilder: SelectQueryBuilder<T>, option?: Record<string, any>) {
  if (!option) return queryBuilder
  // 为了避免 if/if... 判断参数逻辑使用该函数简化
  for (const [k, v] of Object.entries(option)) {
    if (v) {
      // 这里使用传入的 k 当作占位标识即可，占位符随意
      queryBuilder.andWhere(`${k} = :${k}`, { [k]: v })
    }
  }
  return queryBuilder
}
