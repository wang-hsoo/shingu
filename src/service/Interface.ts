export interface InewBoard{
    no?: Number,
    divisioncode: String,
    category: String,
    title: String,
    contents: String,
    addboard: boolean,
    studentid: Number,
    createdtime?: String,
    counts: Number,
    lookup: Boolean
}

export interface Ianswer{
    noanswerboard?:number,
    no: number,
    studentid: string,
    answercontents: string,
    lookup: boolean
}


export interface Idivision{
    divisioncode: number,
    divisionname: string,
    upctg: number
}

export interface IAdmin{
    adminid: string,
    adminpwd: string,
    divisioncode: number
}

export interface Icategory{
    category: string
    id: Number
}

export interface Iuser{
    no?: Number,
    studentid: String,
    username: String,
    password: String,
    divisioncode: String,
    darkmode?: Boolean
}

