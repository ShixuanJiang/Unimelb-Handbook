import pandas as pd

# 读取 CSV 文件"
name  = 'subjects_info.csv'


df = pd.read_csv(name)

# 查看原始数据
print("原始数据:")
print(df.head())

# 查找并展示重复的 subject_code
duplicates = df[df.duplicated(subset='Subject Code', keep=False)]
print("\n重复的记录:")
print(duplicates)

# 删除重复的 subject_code，只保留第一个出现的记录
# df_unique = df.drop_duplicates(subset='Subject Code', keep='first')

# 查看处理后的数据
# print("\n去重后的数据:")
# print(df_unique.head())
#
# # 将结果保存到新的 CSV 文件
# df_unique.to_csv(name, index=False)
