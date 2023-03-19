export interface InewBoard{
    no?: Number,
    divisioncode: Number,
    category: String,
    title: String,
    contents: String,
    addboard: Boolean,
    studentid: Number,
    createdtime?: String,
    counts: Number,
    lookup: Boolean
}

export interface IBoardA{
     postA: InewBoard[] 
}

export interface Ianswer{
    noanswerboard?:Number,
    no: Number,
    studentid: String,
    answercontents: String,
    lookup: Boolean
}


export interface Idivision{
    divisioncode: Number,
    divisionname: String,
    upctg: Number
}

export interface IAdmin{
    adminid: String,
    adminpwd: String,
    divisioncode: Number
}

export interface Icategory{
    category: String
    id: Number
}

export interface Iuser{
    no?: Number,
    studentid: String,
    username: String,
    password?: String,
    divisioncode: Number,
    darkmode?: Boolean,
    approve?:Boolean
}

export interface ICheck{
    check:Boolean
}

