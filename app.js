class HashMap {
  constructor() {
    this.buckets = [{},{},{},{},{},{}]
  }

  hash(key) {
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
 
    return hashCode;
  } 

  set(key,value) {
    let index = this.hash(key) % 6
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }    
    this.buckets[index][key] = value
    if (this.length() > 0.75*this.buckets.length) {
      this.expand()
    }
  }

  get(key) {
    let index = this.hash(key) % 6
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }  
    return this.buckets[index][key]
  }

  has(key) {
    let index = this.hash(key) % 6
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }  
    if (this.buckets[index][key]) return true;
    return false
  }

  remove(key) {
    let index = this.hash(key) % 6
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }  
    if (!this.buckets[index][key]) return true;
    delete this.buckets[index][key]
    return true
  }

  length() {
    let length = 0;
    for (let object of this.buckets) {
      length += Object.keys(object).length
    }
    return length
  }

  clear() {
    for (let object of this.buckets) {
      Object.keys(object).forEach(key => {
        delete object[key]
      })
    }
  }

  keys() {
    let keys = []
    for (let object of this.buckets) {
      Object.keys(object).forEach(key => {
        keys.push(key)
      })
    }
    return keys
  }

  values() {
    let values = []
    for (let object of this.buckets) {
      Object.keys(object).forEach(key => {
        values.push(object[key])
      })
    }
    return values
  }

  entries() {
    let entries = []
    for (let object of this.buckets) {
      Object.keys(object).forEach(key => {
        let pair = []
        pair.push(key)
        pair.push(object[key])
        entries.push(pair)
      })
    }
    return entries
  }

  expand() {
    let newArray = [];
    for (let i = 0; i < (this.buckets.length*2); i++) {
      newArray.push({})
    }
    for (let object of this.buckets) {
      Object.keys(object).forEach(key => {
        this.setNew(key,object[key],newArray)
      })
    }
    this.buckets = newArray
  }

  setNew(key,value,newArray) {
    let index = this.hash(key) % 6
    if (index < 0 || index >= newArray.length) {
      throw new Error("Trying to access index out of bound");
    }    
    newArray[index][key] = value
  }
} 



let map = new HashMap()
console.log(map.hash('tes'))
map.set('tes','leap')
console.log(map.buckets[2])
console.log(map.get('tes'))
console.log(map.has('george'))
map.remove('tes')
console.log(map)

map.set('key1','leap')
map.set('key2','year')
map.set('key3','now')

console.log(map)

console.log(map.length())

// map.clear()
// console.log(map)

console.log(map.keys())

console.log(map.values())

console.log(map.entries())

map.set('key4','leap')
map.set('key5','year')
map.set('key6','now')
map.set('key7','leap')
map.set('key8','year')
map.set('key9','now')

console.log(map)

map.set('key10','now')
map.set('key11','leap')
map.set('key12','year')
map.set('key13','now')

console.log(map)