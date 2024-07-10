import { mongoose } from '@typegoose/typegoose'
import config from '../../config/config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(config.MONGO_URL)
type Reference = {
  key: string
  values: any[]
}

export const BaseSeed = (collectionName: string) => {
  class BaseSeed {
    public values: any[] = []

    async getCollection() {
      await client.connect()
      const db = client.db()
      const collection = db.collection(collectionName)
      return collection
    }
    async insert() {
      const collection = await this.getCollection()
      await collection.insertMany(this.values)
    }

    async setRefs(references: Reference[], insertAfterUpdate = true) {
      this.values = this.values.map((val) => {
        const newVal = { ...val }
        references.forEach((ref) => {
          newVal[ref.key] = ref.values[Math.floor(Math.random() * ref.values.length)]._id
        })

        return newVal
      })

      insertAfterUpdate && (await this.insert())
    }

    async _seed(seedFn: () => any, count = 10, insert = false) {
      this.values = Array.from({ length: count }, () => ({
        ...seedFn(),
        _id: new mongoose.Types.ObjectId(),
        _deleted: false,
      }))

      insert && (await this.insert())
    }
  }

  return BaseSeed
}

export const random = (max: number) => Math.floor(Math.random() * max)
export const array = (fn, count = 5) => Array.from({ length: count }, fn)
