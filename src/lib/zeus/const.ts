/* eslint-disable */

export const AllTypesProps: Record<string,any> = {
	CreateUser:{

	},
	Mutation:{
		createUser:{
			user:"CreateUser"
		},
		deleteUser:{

		}
	}
}

export const ReturnTypes: Record<string,any> = {
	Mutation:{
		createUser:"Boolean",
		deleteUser:"Boolean"
	},
	Query:{
		users:"User"
	},
	User:{
		firstName:"String",
		id:"ID",
		lastName:"String",
		name:"String",
		nameWithNick:"String",
		nick:"String"
	}
}

export const Ops = {
query: "Query" as const,
	mutation: "Mutation" as const
}