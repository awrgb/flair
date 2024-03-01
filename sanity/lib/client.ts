import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "skOzZCNC1s8VIRE0JTkbk6EVLoqtEkCDd3uLxFo7pXqYcBaVw4EXSfXhV6KcwZNoZuo2dVftFSXXlKMyYlbnWoUtqO8dVxPgj2jfccQZVkPllRMdokL4HKZEIfvNyIsQ19vaVK7rqdSHKnlB9szYkvbjh2NMSJ1fno4zUmHx3xSlRm3QWK8P"
})
