import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FinologApi implements ICredentialType {
	name = 'finologApi';
	displayName = 'Finolog API';
	documentationUrl = 'https://api.finolog.ru/docs/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Токен',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'API токен для доступа к Finolog API',
		},
		{
			displayName: 'ID Бизнеса',
			name: 'businessId',
			type: 'number',
			default: '',
			required: false,
			description: 'ID бизнеса в Finolog (необходим для некоторых операций)',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Api-Token': '={{$credentials.apiToken}}',
			},
		},
	};

	test = {
		request: {
			baseURL: 'https://api.finolog.ru',
			url: '/v1/user',
			method: 'GET' as const,
		},
	};
} 