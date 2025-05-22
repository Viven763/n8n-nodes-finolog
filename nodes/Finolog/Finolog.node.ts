import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	INodePropertyOptions,
} from 'n8n-workflow';

export class Finolog implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Finolog',
		name: 'finolog',
		icon: 'file:finolog.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"]}}',
		description: 'Взаимодействие с API Finolog',
		defaults: {
			name: 'Finolog',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'finologApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Ресурс',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Пользователь',
						value: 'user',
						description: 'Управление данными пользователя',
					},
					{
						name: 'Валюта',
						value: 'currency',
						description: 'Управление валютами и их курсами',
					},
					{
						name: 'Бизнес',
						value: 'biz',
						description: 'Управление бизнесами',
					},
					{
						name: 'Компания',
						value: 'company',
						description: 'Управление компаниями',
					},
					{
						name: 'Счет',
						value: 'account',
						description: 'Управление счетами',
					},
					{
						name: 'Операция',
						value: 'transaction',
						description: 'Управление операциями',
					},
					{
						name: 'Статья операции',
						value: 'category',
						description: 'Управление статьями операций',
					},
					{
						name: 'Проект',
						value: 'project',
						description: 'Управление проектами',
					},
					{
						name: 'Контрагент',
						value: 'contractor',
						description: 'Управление контрагентами',
					},
					{
						name: 'Реквизит контрагента',
						value: 'requisite',
						description: 'Управление реквизитами контрагентов',
					},
					{
						name: 'Документ',
						value: 'document',
						description: 'Управление документами',
					},
					{
						name: 'Товар',
						value: 'item',
						description: 'Управление товарами и услугами',
					},
					{
						name: 'Пакет',
						value: 'package',
						description: 'Управление пакетами товаров',
					},
					{
						name: 'Элемент пакета',
						value: 'packageItem',
						description: 'Управление элементами пакета',
					},
				],
				default: 'user',
			},
			{
				displayName: 'Операция',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о пользователе',
						action: 'Получить информацию о пользователе',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о пользователе',
						action: 'Обновить информацию о пользователе',
					},
				],
				default: 'get',
			},
			{
				displayName: 'Операция',
				name: 'currencyOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['currency'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех доступных валют с курсами',
						action: 'Получить список всех валют',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Операция',
				name: 'bizOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['biz'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех бизнесов',
						action: 'Получить список всех бизнесов',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретном бизнесе',
						action: 'Получить информацию о бизнесе',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новый бизнес',
						action: 'Создать новый бизнес',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о бизнесе',
						action: 'Обновить информацию о бизнесе',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить бизнес',
						action: 'Удалить бизнес',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Название',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['biz'],
						bizOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Название бизнеса',
			},
			{
				displayName: 'ID Базовой Валюты',
				name: 'baseCurrencyId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['biz'],
						bizOperation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'ID базовой валюты для бизнеса',
			},
			{
				displayName: 'Имя',
				name: 'firstName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'Имя пользователя',
			},
			{
				displayName: 'Фамилия',
				name: 'lastName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['user'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'Фамилия пользователя',
			},
			{
				displayName: 'Операция',
				name: 'companyOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['company'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех компаний',
						action: 'Получить список всех компаний',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретной компании',
						action: 'Получить информацию о компании',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новую компанию',
						action: 'Создать новую компанию',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о компании',
						action: 'Обновить информацию о компании',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить компанию',
						action: 'Удалить компанию',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Компании',
				name: 'companyId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'ID компании для выполнения операции',
			},
			{
				displayName: 'Название',
				name: 'companyName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Название компании',
			},
			{
				displayName: 'Полное название',
				name: 'fullName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Полное название компании',
			},
			{
				displayName: 'Телефон',
				name: 'phone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Телефон компании',
			},
			{
				displayName: 'Веб-сайт',
				name: 'web',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Веб-сайт компании',
			},
			{
				displayName: 'Компания закрыта',
				name: 'isClosed',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Статус закрытия компании',
			},
			{
				displayName: 'ID Страны',
				name: 'countryId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID страны компании',
			},
			{
				displayName: 'Дополнительная информация',
				name: 'moreInformation',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Дополнительная информация о компании',
			},
			{
				displayName: 'ИНН',
				name: 'inn',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ИНН компании',
			},
			{
				displayName: 'КПП',
				name: 'kpp',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'КПП компании',
			},
			{
				displayName: 'Логотип',
				name: 'logo',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Логотип компании',
			},
			{
				displayName: 'Печать',
				name: 'stamp',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Печать компании',
			},
			{
				displayName: 'Город',
				name: 'addressCity',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Город компании',
			},
			{
				displayName: 'Индекс',
				name: 'addressPostalIndex',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Почтовый индекс компании',
			},
			{
				displayName: 'Улица и дом',
				name: 'addressStreet',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Улица и номер дома компании',
			},
			{
				displayName: 'ФИО директора',
				name: 'directorName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ФИО директора компании',
			},
			{
				displayName: 'Должность директора',
				name: 'directorPosition',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Должность директора компании',
			},
			{
				displayName: 'Подпись директора',
				name: 'directorSign',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['company'],
						companyOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Подпись директора компании',
			},
			{
				displayName: 'Операция',
				name: 'accountOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех счетов',
						action: 'Получить список всех счетов',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретном счете',
						action: 'Получить информацию о счете',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новый счет',
						action: 'Создать новый счет',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о счете',
						action: 'Обновить информацию о счете',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить счет',
						action: 'Удалить счет',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Счета',
				name: 'accountId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'ID счета для выполнения операции',
			},
			{
				displayName: 'ID Счетов',
				name: 'accountIds',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Фильтр по ID банковских счетов (список ID через запятую)',
			},
			{
				displayName: 'ID Компании',
				name: 'companyId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'ID компании',
			},
			{
				displayName: 'ID Валюты',
				name: 'currencyId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'ID валюты',
			},
			{
				displayName: 'Название',
				name: 'accountName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Название счета',
			},
			{
				displayName: 'Начальный остаток',
				name: 'initialBalance',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create', 'update'],
					},
				},
				default: 0,
				required: true,
				description: 'Начальный остаток на счете',
			},
			{
				displayName: 'Номер счета',
				name: 'bankAccount',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Номер банковского счета',
			},
			{
				displayName: 'БИК банка',
				name: 'bankBic',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'БИК банка',
			},
			{
				displayName: 'Код IBAN',
				name: 'bankIban',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Код IBAN',
			},
			{
				displayName: 'Код МФО',
				name: 'bankMfo',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Код МФО',
			},
			{
				displayName: 'Счет закрыт',
				name: 'isClosed',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['account'],
						accountOperation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Статус закрытия счета',
			},
			{
				displayName: 'Операция',
				name: 'transactionOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['transaction'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех операций',
						action: 'Получить список всех операций',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретной операции',
						action: 'Получить информацию об операции',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новую операцию',
						action: 'Создать новую операцию',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию об операции',
						action: 'Обновить информацию об операции',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить операцию',
						action: 'Удалить операцию',
					},
					{
						name: 'Разбить',
						value: 'split',
						description: 'Разбить операцию на несколько',
						action: 'Разбить операцию на несколько',
					},
					{
						name: 'Отменить разбиение',
						value: 'unsplit',
						description: 'Отменить разбиение операции',
						action: 'Отменить разбиение операции',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Операции',
				name: 'transactionId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['get', 'update', 'delete', 'split', 'unsplit'],
					},
				},
				default: '',
				required: true,
				description: 'ID операции для выполнения операции',
			},
			{
				displayName: 'Дата',
				name: 'date',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Дата операции (Y-m-d HH:mm:ss)',
			},
			{
				displayName: 'ID Компании',
				name: 'companyId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID компании',
			},
			{
				displayName: 'ID Статьи',
				name: 'categoryId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID статьи',
			},
			{
				displayName: 'ID Контрагента',
				name: 'contractorId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID контрагента',
			},
			{
				displayName: 'ID Реквизита',
				name: 'requisiteId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID реквизита контрагента',
			},
			{
				displayName: 'ID Проекта',
				name: 'projectId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID проекта',
			},
			{
				displayName: 'ID Счета Отправления',
				name: 'fromId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID счета с которого происходит операция',
			},
			{
				displayName: 'ID Счета Получения',
				name: 'toId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID счета на который происходит операция',
			},
			{
				displayName: 'Сумма',
				name: 'value',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Сумма операции',
			},
			{
				displayName: 'Сумма Расхода',
				name: 'fromValue',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Сумма расходной операции (для перевода)',
			},
			{
				displayName: 'Сумма Прихода',
				name: 'toValue',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Сумма приходной операции (для перевода)',
			},
			{
				displayName: 'Статус',
				name: 'status',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Обычная',
						value: 'regular',
					},
					{
						name: 'Плановая',
						value: 'planned',
					},
				],
				default: 'regular',
				description: 'Статус операции',
			},
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Описание операции',
			},
			{
				displayName: 'ID Заказа',
				name: 'orderId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID заказа',
			},
			{
				displayName: 'Учитывать в дебиторке',
				name: 'isDebt',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['create'],
					},
				},
				default: false,
				description: 'Учитывать операцию в дебиторке',
			},
			{
				displayName: 'Элементы разбиения',
				name: 'splitItems',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['transaction'],
						transactionOperation: ['split'],
					},
				},
				default: '[]',
				description: 'Массив элементов разбиения в формате JSON',
			},
			{
				displayName: 'Операция',
				name: 'categoryOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['category'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех статей',
						action: 'Получить список всех статей',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретной статье',
						action: 'Получить информацию о статье',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новую статью',
						action: 'Создать новую статью',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о статье',
						action: 'Обновить информацию о статье',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить статью',
						action: 'Удалить статью',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Статьи',
				name: 'categoryId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'ID статьи для выполнения операции',
			},
			{
				displayName: 'Название',
				name: 'categoryName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Название статьи',
			},
			{
				displayName: 'Тип',
				name: 'categoryType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create'],
					},
				},
				options: [
					{
						name: 'Приход',
						value: 'in',
					},
					{
						name: 'Расход',
						value: 'out',
					},
					{
						name: 'Перевод',
						value: 'inout',
					},
				],
				default: 'in',
				required: true,
				description: 'Тип статьи',
			},
			{
				displayName: 'Вид деятельности',
				name: 'activities',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Операционный',
						value: 'operating',
					},
					{
						name: 'Финансовый',
						value: 'financial',
					},
					{
						name: 'Инвестиционный',
						value: 'investment',
					},
				],
				default: 'operating',
				description: 'Вид деятельности',
			},
			{
				displayName: 'Описание',
				name: 'categoryDescription',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Описание статьи',
			},
			{
				displayName: 'Цвет',
				name: 'color',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Шестнадцатеричный код цвета (формат #000000)',
			},
			{
				displayName: 'Ввод денег',
				name: 'cashInOut',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Тип статьи прихода (true - Ввод денег, false - Статья прихода)',
			},
			{
				displayName: 'Погашение процентов',
				name: 'interestRepayment',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Тип расхода Погашение процентов',
			},
			{
				displayName: 'Тип налога',
				name: 'taxType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'НДС',
						value: 'taxes_vat',
					},
					{
						name: 'Налог на фонд оплаты труда',
						value: 'taxes_foundation',
					},
					{
						name: 'Налог на имущество',
						value: 'taxes_property',
					},
					{
						name: 'Налог на прибыль',
						value: 'taxes_money',
					},
				],
				default: 'taxes_vat',
				description: 'Статья налогов',
			},
			{
				displayName: 'ID Группы',
				name: 'groupId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['category'],
						categoryOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID группы',
			},
			{
				displayName: 'Операция',
				name: 'projectOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех проектов',
						action: 'Получить список всех проектов',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретном проекте',
						action: 'Получить информацию о проекте',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новый проект',
						action: 'Создать новый проект',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о проекте',
						action: 'Обновить информацию о проекте',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить проект',
						action: 'Удалить проект',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Проекта',
				name: 'projectId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'ID проекта для выполнения операции',
			},
			{
				displayName: 'ID Валюты',
				name: 'currencyId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'ID валюты проекта',
			},
			{
				displayName: 'Название',
				name: 'projectName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Название проекта',
			},
			{
				displayName: 'Описание',
				name: 'projectDescription',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Описание проекта',
			},
			{
				displayName: 'Планируемые приходы',
				name: 'planIncomeValue',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Планируемые приходы по проекту',
			},
			{
				displayName: 'Планируемые расходы',
				name: 'planOutcomeValue',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Планируемые расходы по проекту',
			},
			{
				displayName: 'Статус',
				name: 'projectStatus',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Активный',
						value: 'active',
					},
					{
						name: 'На паузе',
						value: 'on hold',
					},
					{
						name: 'Завершен',
						value: 'completed',
					},
					{
						name: 'В архиве',
						value: 'archive',
					},
				],
				default: 'active',
				description: 'Статус проекта',
			},
			{
				displayName: 'ID Среза',
				name: 'groupId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['project'],
						projectOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID среза проекта',
			},
			{
				displayName: 'Операция',
				name: 'contractorOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contractor'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех контрагентов',
						action: 'Получить список всех контрагентов',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретном контрагенте',
						action: 'Получить информацию о контрагенте',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать нового контрагента',
						action: 'Создать нового контрагента',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о контрагенте',
						action: 'Обновить информацию о контрагенте',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить контрагента',
						action: 'Удалить контрагента',
					},
					{
						name: 'Создать автозаполнение',
						value: 'createAutoeditor',
						description: 'Создать автозаполнение по контрагенту',
						action: 'Создать автозаполнение по контрагенту',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Контрагента',
				name: 'contractorId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['get', 'update', 'delete', 'createAutoeditor'],
					},
				},
				default: '',
				required: true,
				description: 'ID контрагента для выполнения операции',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Фильтр по электронной почте',
			},
			{
				displayName: 'ИНН',
				name: 'inn',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Фильтр по ИНН',
			},
			{
				displayName: 'Включить связанные сущности',
				name: 'with',
				type: 'multiOptions',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				options: [
					{
						name: 'Реквизиты',
						value: 'requisites',
					},
					{
						name: 'Долги',
						value: 'debts',
					},
					{
						name: 'Автозаполнение',
						value: 'autoeditor',
					},
				],
				default: [],
				description: 'Включить в ответ запроса связные сущности',
			},
			{
				displayName: 'Страница',
				name: 'page',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				default: 1,
				description: 'Страница ответа на запрос',
			},
			{
				displayName: 'Размер страницы',
				name: 'pagesize',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				default: 50,
				description: 'Количество элементов на странице',
			},
			{
				displayName: 'Поиск',
				name: 'query',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Строка поиска',
			},
			{
				displayName: 'ID Контрагентов',
				name: 'ids',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Фильтр элементов по ID (список id через запятую)',
			},
			{
				displayName: 'Контрагент бизнеса',
				name: 'isBizzed',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['getAll'],
					},
				},
				default: false,
				description: 'Фильтр по контрагентам являющихся контрагентом бизнеса',
			},
			{
				displayName: 'Название',
				name: 'contractorName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Название контрагента',
			},
			{
				displayName: 'Email',
				name: 'contractorEmail',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Email контрагента',
			},
			{
				displayName: 'Телефон',
				name: 'contractorPhone',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Телефон контрагента',
			},
			{
				displayName: 'Контактное лицо',
				name: 'contractorPerson',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Контактное лицо контрагента',
			},
			{
				displayName: 'Описание',
				name: 'contractorDescription',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Описание контрагента',
			},
			{
				displayName: 'Конфигурация автозаполнения',
				name: 'autoeditorConfig',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['contractor'],
						contractorOperation: ['createAutoeditor'],
					},
				},
				default: '[]',
				description: 'Массив автозаполнения в формате JSON',
			},
			{
				displayName: 'Операция',
				name: 'documentOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['document'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех документов',
						action: 'Получить список всех документов',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретном документе',
						action: 'Получить информацию о документе',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новый документ',
						action: 'Создать новый документ',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о документе',
						action: 'Обновить информацию о документе',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить документ',
						action: 'Удалить документ',
					},
					{
						name: 'Получить PDF',
						value: 'getPdf',
						description: 'Получить документ в формате PDF',
						action: 'Получить документ в формате PDF',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Документа',
				name: 'documentId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['get', 'update', 'delete', 'getPdf'],
					},
				},
				default: '',
				required: true,
				description: 'ID документа для выполнения операции',
			},
			{
				displayName: 'Страница',
				name: 'page',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getAll'],
					},
				},
				default: 1,
				description: 'Страница ответа на запрос',
			},
			{
				displayName: 'Размер страницы',
				name: 'pagesize',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getAll'],
					},
				},
				default: 50,
				description: 'Количество элементов на странице',
			},
			{
				displayName: 'Поиск',
				name: 'query',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Строка поиска',
			},
			{
				displayName: 'ID Товара',
				name: 'itemId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Фильтр по ID товара',
			},
			{
				displayName: 'Тип документа',
				name: 'kind',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getAll', 'create', 'update'],
					},
				},
				options: [
					{
						name: 'Счет на оплату',
						value: 'invoice',
					},
					{
						name: 'Отгрузка',
						value: 'shipment',
					},
				],
				default: 'invoice',
				description: 'Тип документа',
			},
			{
				displayName: 'Шаблон',
				name: 'template',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getAll', 'create', 'update'],
						kind: ['invoice'],
					},
				},
				options: [
					{
						name: 'Русифицированный',
						value: 'ru',
					},
					{
						name: 'Интернациональный',
						value: 'international',
					},
				],
				default: 'ru',
				description: 'Шаблон документа',
			},
			{
				displayName: 'Шаблон отгрузки',
				name: 'shipmentTemplate',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getAll', 'create', 'update'],
						kind: ['shipment'],
					},
				},
				options: [
					{
						name: 'По остаткам',
						value: 'stock',
					},
					{
						name: 'По основным средствам',
						value: 'asset',
					},
				],
				default: 'stock',
				description: 'Шаблон отгрузки',
			},
			{
				displayName: 'Тип НДС',
				name: 'vatType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create'],
					},
				},
				options: [
					{
						name: 'Без НДС',
						value: 'no',
					},
					{
						name: 'Включен',
						value: 'included',
					},
					{
						name: 'Выделен',
						value: 'excluded',
					},
				],
				default: 'included',
				required: true,
				description: 'Тип НДС',
			},
			{
				displayName: 'Направление',
				name: 'type',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Входящий',
						value: 'in',
					},
					{
						name: 'Исходящий',
						value: 'out',
					},
				],
				default: 'out',
				description: 'Тип документа',
			},
			{
				displayName: 'Дата',
				name: 'date',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Дата документа (Y-m-d)',
			},
			{
				displayName: 'ID Контрагента поставщика',
				name: 'fromContractorId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID контрагента поставщика',
			},
			{
				displayName: 'ID Реквизитов поставщика',
				name: 'fromRequisiteId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID реквизитов поставщика',
			},
			{
				displayName: 'ID Контрагента покупателя',
				name: 'toContractorId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID контрагента покупателя',
			},
			{
				displayName: 'ID Реквизитов покупателя',
				name: 'toRequisiteId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID реквизитов покупателя',
			},
			{
				displayName: 'Название контрагента-получателя',
				name: 'toContractorDraft',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Название контрагента-получателя (если он еще не создан)',
			},
			{
				displayName: 'Номер документа',
				name: 'number',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Номер документа',
			},
			{
				displayName: 'Статус',
				name: 'status',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Черновик',
						value: 'draft',
					},
					{
						name: 'Опубликован',
						value: 'published',
					},
					{
						name: 'Просмотрен',
						value: 'viewed',
					},
					{
						name: 'Оплачен',
						value: 'paid',
					},
					{
						name: 'Ошибочный',
						value: 'wrong',
					},
				],
				default: 'draft',
				description: 'Статус документа',
			},
			{
				displayName: 'Комментарий',
				name: 'comment',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Комментарий к документу',
			},
			{
				displayName: 'Описание',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Описание документа',
			},
			{
				displayName: 'Тип модели',
				name: 'modelType',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Модель к которой будет привязан документ',
			},
			{
				displayName: 'ID Модели',
				name: 'modelId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID модели к которой будет привязан документ',
			},
			{
				displayName: 'Товары и услуги',
				name: 'items',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['create'],
					},
				},
				default: '[]',
				required: true,
				description: 'Массив товаров и услуг в формате JSON',
			},
			{
				displayName: 'Без подписи',
				name: 'noSign',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['document'],
						documentOperation: ['getPdf'],
					},
				},
				default: false,
				description: 'Не отображать в сгенерированном PDF печать и подпись',
			},
			{
				displayName: 'Операция',
				name: 'itemOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['item'],
					},
				},
				options: [
					{
						name: 'Получить список',
						value: 'getAll',
						description: 'Получить список всех товаров',
						action: 'Получить список всех товаров',
					},
					{
						name: 'Получить',
						value: 'get',
						description: 'Получить информацию о конкретном товаре',
						action: 'Получить информацию о товаре',
					},
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новый товар',
						action: 'Создать новый товар',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о товаре',
						action: 'Обновить информацию о товаре',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить товар',
						action: 'Удалить товар',
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'ID Товара',
				name: 'itemId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'ID товара для выполнения операции',
			},
			{
				displayName: 'Страница',
				name: 'page',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['getAll'],
					},
				},
				default: 1,
				description: 'Страница ответа на запрос',
			},
			{
				displayName: 'Размер страницы',
				name: 'pagesize',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['getAll'],
					},
				},
				default: 50,
				description: 'Количество элементов на странице',
			},
			{
				displayName: 'ID Товаров',
				name: 'ids',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Фильтр по ID товаров (список ID через запятую)',
			},
			{
				displayName: 'Поиск',
				name: 'query',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['getAll'],
					},
				},
				default: '',
				description: 'Строка поиска',
			},
			{
				displayName: 'Название',
				name: 'itemName',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'Название товара',
			},
			{
				displayName: 'ID Валюты',
				name: 'priceCurrencyId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: '',
				required: true,
				description: 'ID валюты',
			},
			{
				displayName: 'Тип',
				name: 'itemType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Товар',
						value: 'product',
					},
					{
						name: 'Услуга',
						value: 'service',
					},
				],
				default: 'product',
				description: 'Тип товара',
			},
			{
				displayName: 'Артикул',
				name: 'sku',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Артикул товара',
			},
			{
				displayName: 'Цена',
				name: 'price',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Цена товара',
			},
			{
				displayName: 'НДС %',
				name: 'vat',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Процент НДС',
			},
			{
				displayName: 'ID Единицы измерения',
				name: 'unitId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID единицы измерения',
			},
			{
				displayName: 'Описание',
				name: 'itemDescription',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Описание товара',
			},
			{
				displayName: 'Активен',
				name: 'active',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['item'],
						itemOperation: ['create', 'update'],
					},
				},
				default: false,
				description: 'Флаг активности товара',
			},
			{
				displayName: 'Операция',
				name: 'packageOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['package'],
					},
				},
				options: [
					{
						name: 'Создать',
						value: 'create',
						description: 'Создать новый пакет',
						action: 'Создать новый пакет',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить информацию о пакете',
						action: 'Обновить информацию о пакете',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить пакет',
						action: 'Удалить пакет',
					},
				],
				default: 'create',
			},
			{
				displayName: 'ID Пакета',
				name: 'packageId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['package'],
						packageOperation: ['update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'ID пакета для выполнения операции',
			},
			{
				displayName: 'Тип НДС',
				name: 'vatType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['package'],
						packageOperation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Без НДС',
						value: 'no',
					},
					{
						name: 'Включен',
						value: 'included',
					},
					{
						name: 'Выделен',
						value: 'excluded',
					},
				],
				default: 'included',
				description: 'Тип НДС',
			},
			{
				displayName: 'Операция',
				name: 'packageItemOperation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['packageItem'],
					},
				},
				options: [
					{
						name: 'Добавить',
						value: 'create',
						description: 'Добавить элемент в пакет',
						action: 'Добавить элемент в пакет',
					},
					{
						name: 'Обновить',
						value: 'update',
						description: 'Обновить элемент пакета',
						action: 'Обновить элемент пакета',
					},
					{
						name: 'Удалить',
						value: 'delete',
						description: 'Удалить элемент пакета',
						action: 'Удалить элемент пакета',
					},
				],
				default: 'create',
			},
			{
				displayName: 'ID Пакета',
				name: 'packageId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['packageItem'],
					},
				},
				default: '',
				required: true,
				description: 'ID пакета',
			},
			{
				displayName: 'ID Элемента пакета',
				name: 'packageItemId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['packageItem'],
						packageItemOperation: ['update', 'delete'],
					},
				},
				default: '',
				required: true,
				description: 'ID элемента пакета',
			},
			{
				displayName: 'ID Товара',
				name: 'itemId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['packageItem'],
						packageItemOperation: ['create'],
					},
				},
				default: '',
				required: true,
				description: 'ID товара',
			},
			{
				displayName: 'Количество',
				name: 'count',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['packageItem'],
						packageItemOperation: ['create', 'update'],
					},
				},
				default: 1,
				description: 'Количество товаров',
			},
			{
				displayName: 'Стоимость',
				name: 'price',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['packageItem'],
						packageItemOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Стоимость товара',
			},
			{
				displayName: 'НДС',
				name: 'vat',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['packageItem'],
						packageItemOperation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'НДС',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('finologApi');

		let responseData;

		if (resource === 'user') {
			if (operation === 'get') {
				responseData = await this.helpers.request({
					method: 'GET',
					url: 'https://api.finolog.ru/v1/user',
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'update') {
				const firstName = this.getNodeParameter('firstName', 0) as string;
				const lastName = this.getNodeParameter('lastName', 0) as string;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: 'https://api.finolog.ru/v1/user',
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						first_name: firstName,
						last_name: lastName,
					},
				});
			}
		} else if (resource === 'currency') {
			if (operation === 'getAll') {
				responseData = await this.helpers.request({
					method: 'GET',
					url: 'https://api.finolog.ru/v1/currency',
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'biz') {
			if (operation === 'getAll') {
				responseData = await this.helpers.request({
					method: 'GET',
					url: 'https://api.finolog.ru/v1/biz',
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				const name = this.getNodeParameter('name', 0) as string;
				const baseCurrencyId = this.getNodeParameter('baseCurrencyId', 0) as number;

				responseData = await this.helpers.request({
					method: 'POST',
					url: 'https://api.finolog.ru/v1/biz',
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						base_currency_id: baseCurrencyId,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const name = this.getNodeParameter('name', 0) as string;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'company') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/company`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const companyId = this.getNodeParameter('companyId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/company/${companyId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const name = this.getNodeParameter('companyName', 0) as string;
				const fullName = this.getNodeParameter('fullName', 0) as string;
				const phone = this.getNodeParameter('phone', 0) as string;
				const web = this.getNodeParameter('web', 0) as string;
				const isClosed = this.getNodeParameter('isClosed', 0) as boolean;
				const countryId = this.getNodeParameter('countryId', 0) as number;
				const moreInformation = this.getNodeParameter('moreInformation', 0) as string;
				const inn = this.getNodeParameter('inn', 0) as string;
				const kpp = this.getNodeParameter('kpp', 0) as string;
				const logo = this.getNodeParameter('logo', 0) as string;
				const stamp = this.getNodeParameter('stamp', 0) as string;
				const addressCity = this.getNodeParameter('addressCity', 0) as string;
				const addressPostalIndex = this.getNodeParameter('addressPostalIndex', 0) as string;
				const addressStreet = this.getNodeParameter('addressStreet', 0) as string;
				const directorName = this.getNodeParameter('directorName', 0) as string;
				const directorPosition = this.getNodeParameter('directorPosition', 0) as string;
				const directorSign = this.getNodeParameter('directorSign', 0) as string;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/company`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						full_name: fullName,
						phone,
						web,
						is_closed: isClosed,
						country_id: countryId,
						more_information: moreInformation,
						inn,
						kpp,
						logo,
						stamp,
						address_city: addressCity,
						address_postal_index: addressPostalIndex,
						address_street: addressStreet,
						director_name: directorName,
						director_position: directorPosition,
						director_sign: directorSign,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const companyId = this.getNodeParameter('companyId', 0) as number;
				const name = this.getNodeParameter('companyName', 0) as string;
				const fullName = this.getNodeParameter('fullName', 0) as string;
				const phone = this.getNodeParameter('phone', 0) as string;
				const web = this.getNodeParameter('web', 0) as string;
				const isClosed = this.getNodeParameter('isClosed', 0) as boolean;
				const countryId = this.getNodeParameter('countryId', 0) as number;
				const moreInformation = this.getNodeParameter('moreInformation', 0) as string;
				const inn = this.getNodeParameter('inn', 0) as string;
				const kpp = this.getNodeParameter('kpp', 0) as string;
				const logo = this.getNodeParameter('logo', 0) as string;
				const stamp = this.getNodeParameter('stamp', 0) as string;
				const addressCity = this.getNodeParameter('addressCity', 0) as string;
				const addressPostalIndex = this.getNodeParameter('addressPostalIndex', 0) as string;
				const addressStreet = this.getNodeParameter('addressStreet', 0) as string;
				const directorName = this.getNodeParameter('directorName', 0) as string;
				const directorPosition = this.getNodeParameter('directorPosition', 0) as string;
				const directorSign = this.getNodeParameter('directorSign', 0) as string;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/company/${companyId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						full_name: fullName,
						phone,
						web,
						is_closed: isClosed,
						country_id: countryId,
						more_information: moreInformation,
						inn,
						kpp,
						logo,
						stamp,
						address_city: addressCity,
						address_postal_index: addressPostalIndex,
						address_street: addressStreet,
						director_name: directorName,
						director_position: directorPosition,
						director_sign: directorSign,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const companyId = this.getNodeParameter('companyId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/company/${companyId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'account') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const accountIds = this.getNodeParameter('accountIds', 0) as string;
				const qs: { ids?: string } = {};
				if (accountIds) {
					qs.ids = accountIds;
				}
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/account`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
					qs,
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const accountId = this.getNodeParameter('accountId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/account/${accountId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const companyId = this.getNodeParameter('companyId', 0) as number;
				const currencyId = this.getNodeParameter('currencyId', 0) as number;
				const name = this.getNodeParameter('accountName', 0) as string;
				const initialBalance = this.getNodeParameter('initialBalance', 0) as number;
				const bankAccount = this.getNodeParameter('bankAccount', 0) as string;
				const bankBic = this.getNodeParameter('bankBic', 0) as string;
				const bankIban = this.getNodeParameter('bankIban', 0) as string;
				const bankMfo = this.getNodeParameter('bankMfo', 0) as string;
				const isClosed = this.getNodeParameter('isClosed', 0) as boolean;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/account`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						company_id: companyId,
						currency_id: currencyId,
						name,
						initial_balance: initialBalance,
						bank_account: bankAccount,
						bank_bic: bankBic,
						bank_iban: bankIban,
						bank_mfo: bankMfo,
						is_closed: isClosed,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const accountId = this.getNodeParameter('accountId', 0) as number;
				const name = this.getNodeParameter('accountName', 0) as string;
				const initialBalance = this.getNodeParameter('initialBalance', 0) as number;
				const bankAccount = this.getNodeParameter('bankAccount', 0) as string;
				const bankBic = this.getNodeParameter('bankBic', 0) as string;
				const bankIban = this.getNodeParameter('bankIban', 0) as string;
				const bankMfo = this.getNodeParameter('bankMfo', 0) as string;
				const isClosed = this.getNodeParameter('isClosed', 0) as boolean;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/account/${accountId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						initial_balance: initialBalance,
						bank_account: bankAccount,
						bank_bic: bankBic,
						bank_iban: bankIban,
						bank_mfo: bankMfo,
						is_closed: isClosed,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const accountId = this.getNodeParameter('accountId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/account/${accountId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'transaction') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/transaction`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const transactionId = this.getNodeParameter('transactionId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/transaction/${transactionId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const date = this.getNodeParameter('date', 0) as string;
				const companyId = this.getNodeParameter('companyId', 0) as number;
				const categoryId = this.getNodeParameter('categoryId', 0) as number;
				const contractorId = this.getNodeParameter('contractorId', 0) as number;
				const requisiteId = this.getNodeParameter('requisiteId', 0) as number;
				const projectId = this.getNodeParameter('projectId', 0) as number;
				const fromId = this.getNodeParameter('fromId', 0) as number;
				const toId = this.getNodeParameter('toId', 0) as number;
				const value = this.getNodeParameter('value', 0) as number;
				const fromValue = this.getNodeParameter('fromValue', 0) as number;
				const toValue = this.getNodeParameter('toValue', 0) as number;
				const status = this.getNodeParameter('status', 0) as string;
				const description = this.getNodeParameter('description', 0) as string;
				const orderId = this.getNodeParameter('orderId', 0) as number;
				const isDebt = this.getNodeParameter('isDebt', 0) as boolean;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/transaction`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						date,
						company_id: companyId,
						category_id: categoryId,
						contractor_id: contractorId,
						requisite_id: requisiteId,
						project_id: projectId,
						from_id: fromId,
						to_id: toId,
						value,
						from_value: fromValue,
						to_value: toValue,
						status,
						description,
						order_id: orderId,
						is_debt: isDebt,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const transactionId = this.getNodeParameter('transactionId', 0) as number;
				const date = this.getNodeParameter('date', 0) as string;
				const companyId = this.getNodeParameter('companyId', 0) as number;
				const categoryId = this.getNodeParameter('categoryId', 0) as number;
				const contractorId = this.getNodeParameter('contractorId', 0) as number;
				const requisiteId = this.getNodeParameter('requisiteId', 0) as number;
				const projectId = this.getNodeParameter('projectId', 0) as number;
				const fromId = this.getNodeParameter('fromId', 0) as number;
				const toId = this.getNodeParameter('toId', 0) as number;
				const value = this.getNodeParameter('value', 0) as number;
				const fromValue = this.getNodeParameter('fromValue', 0) as number;
				const toValue = this.getNodeParameter('toValue', 0) as number;
				const status = this.getNodeParameter('status', 0) as string;
				const description = this.getNodeParameter('description', 0) as string;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/transaction/${transactionId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						date,
						company_id: companyId,
						category_id: categoryId,
						contractor_id: contractorId,
						requisite_id: requisiteId,
						project_id: projectId,
						from_id: fromId,
						to_id: toId,
						value,
						from_value: fromValue,
						to_value: toValue,
						status,
						description,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const transactionId = this.getNodeParameter('transactionId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/transaction/${transactionId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'split') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const transactionId = this.getNodeParameter('transactionId', 0) as number;
				const splitItems = this.getNodeParameter('splitItems', 0) as string;
				const items = JSON.parse(splitItems);

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/transaction/${transactionId}/split`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: {
						items,
					},
				});
			} else if (operation === 'unsplit') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const transactionId = this.getNodeParameter('transactionId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/transaction/${transactionId}/split`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'category') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/category`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const categoryId = this.getNodeParameter('categoryId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/category/${categoryId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const name = this.getNodeParameter('categoryName', 0) as string;
				const type = this.getNodeParameter('categoryType', 0) as string;
				const activities = this.getNodeParameter('activities', 0) as string;
				const description = this.getNodeParameter('categoryDescription', 0) as string;
				const color = this.getNodeParameter('color', 0) as string;
				const cashInOut = this.getNodeParameter('cashInOut', 0) as boolean;
				const interestRepayment = this.getNodeParameter('interestRepayment', 0) as boolean;
				const taxType = this.getNodeParameter('taxType', 0) as string;
				const groupId = this.getNodeParameter('groupId', 0) as number;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/category`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						type,
						activities,
						description,
						color,
						cash_in_out: cashInOut,
						interest_repayment: interestRepayment,
						tax_type: taxType,
						group_id: groupId,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const categoryId = this.getNodeParameter('categoryId', 0) as number;
				const name = this.getNodeParameter('categoryName', 0) as string;
				const activities = this.getNodeParameter('activities', 0) as string;
				const description = this.getNodeParameter('categoryDescription', 0) as string;
				const color = this.getNodeParameter('color', 0) as string;
				const cashInOut = this.getNodeParameter('cashInOut', 0) as boolean;
				const interestRepayment = this.getNodeParameter('interestRepayment', 0) as boolean;
				const taxType = this.getNodeParameter('taxType', 0) as string;
				const groupId = this.getNodeParameter('groupId', 0) as number;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/category/${categoryId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						activities,
						description,
						color,
						cash_in_out: cashInOut,
						interest_repayment: interestRepayment,
						tax_type: taxType,
						group_id: groupId,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const categoryId = this.getNodeParameter('categoryId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/category/${categoryId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'project') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/project`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const projectId = this.getNodeParameter('projectId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/project/${projectId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const currencyId = this.getNodeParameter('currencyId', 0) as number;
				const name = this.getNodeParameter('projectName', 0) as string;
				const description = this.getNodeParameter('projectDescription', 0) as string;
				const planIncomeValue = this.getNodeParameter('planIncomeValue', 0) as number;
				const planOutcomeValue = this.getNodeParameter('planOutcomeValue', 0) as number;
				const status = this.getNodeParameter('projectStatus', 0) as string;
				const groupId = this.getNodeParameter('groupId', 0) as number;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/project`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						currency_id: currencyId,
						name,
						description,
						plan_income_value: planIncomeValue,
						plan_outcome_value: planOutcomeValue,
						status,
						group_id: groupId,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const projectId = this.getNodeParameter('projectId', 0) as number;
				const name = this.getNodeParameter('projectName', 0) as string;
				const description = this.getNodeParameter('projectDescription', 0) as string;
				const planIncomeValue = this.getNodeParameter('planIncomeValue', 0) as number;
				const planOutcomeValue = this.getNodeParameter('planOutcomeValue', 0) as number;
				const status = this.getNodeParameter('projectStatus', 0) as string;
				const groupId = this.getNodeParameter('groupId', 0) as number;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/project/${projectId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						description,
						plan_income_value: planIncomeValue,
						plan_outcome_value: planOutcomeValue,
						status,
						group_id: groupId,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const projectId = this.getNodeParameter('projectId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/project/${projectId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'contractor') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const email = this.getNodeParameter('email', 0) as string;
				const inn = this.getNodeParameter('inn', 0) as string;
				const withEntities = this.getNodeParameter('with', 0) as string[];
				const page = this.getNodeParameter('page', 0) as number;
				const pagesize = this.getNodeParameter('pagesize', 0) as number;
				const query = this.getNodeParameter('query', 0) as string;
				const ids = this.getNodeParameter('ids', 0) as string;
				const isBizzed = this.getNodeParameter('isBizzed', 0) as boolean;

				const qs: {
					email?: string;
					inn?: string;
					with?: string;
					page?: number;
					pagesize?: number;
					query?: string;
					ids?: string;
					is_bizzed?: boolean;
				} = {};

				if (email) qs.email = email;
				if (inn) qs.inn = inn;
				if (withEntities.length > 0) qs.with = withEntities.join(',');
				if (page) qs.page = page;
				if (pagesize) qs.pagesize = pagesize;
				if (query) qs.query = query;
				if (ids) qs.ids = ids;
				if (isBizzed) qs.is_bizzed = isBizzed;

				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/contractor`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
					qs,
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const contractorId = this.getNodeParameter('contractorId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/contractor/${contractorId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const name = this.getNodeParameter('contractorName', 0) as string;
				const email = this.getNodeParameter('contractorEmail', 0) as string;
				const phone = this.getNodeParameter('contractorPhone', 0) as string;
				const person = this.getNodeParameter('contractorPerson', 0) as string;
				const description = this.getNodeParameter('contractorDescription', 0) as string;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/contractor`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						email,
						phone,
						person,
						description,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const contractorId = this.getNodeParameter('contractorId', 0) as number;
				const name = this.getNodeParameter('contractorName', 0) as string;
				const email = this.getNodeParameter('contractorEmail', 0) as string;
				const phone = this.getNodeParameter('contractorPhone', 0) as string;
				const person = this.getNodeParameter('contractorPerson', 0) as string;
				const description = this.getNodeParameter('contractorDescription', 0) as string;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/contractor/${contractorId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						email,
						phone,
						person,
						description,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const contractorId = this.getNodeParameter('contractorId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/contractor/${contractorId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'createAutoeditor') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const contractorId = this.getNodeParameter('contractorId', 0) as number;
				const config = this.getNodeParameter('autoeditorConfig', 0) as string;
				let configData;
				try {
					configData = JSON.parse(config);
				} catch (error) {
					throw new Error('Неверный формат JSON для конфигурации автозаполнения');
				}

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/contractor/${contractorId}/autoeditor`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: {
						config: configData,
					},
				});
			}
		} else if (resource === 'document') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const page = this.getNodeParameter('page', 0) as number;
				const pagesize = this.getNodeParameter('pagesize', 0) as number;
				const query = this.getNodeParameter('query', 0) as string;
				const itemId = this.getNodeParameter('itemId', 0) as number;
				const kind = this.getNodeParameter('kind', 0) as string;
				const template = kind === 'invoice' 
					? this.getNodeParameter('template', 0) as string
					: this.getNodeParameter('shipmentTemplate', 0) as string;

				const qs: {
					page?: number;
					pagesize?: number;
					query?: string;
					item_id?: number;
					kind?: string;
					template?: string;
				} = {};

				if (page) qs.page = page;
				if (pagesize) qs.pagesize = pagesize;
				if (query) qs.query = query;
				if (itemId) qs.item_id = itemId;
				if (kind) qs.kind = kind;
				if (template) qs.template = template;

				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/document`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
					qs,
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const documentId = this.getNodeParameter('documentId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/document/${documentId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const kind = this.getNodeParameter('kind', 0) as string;
				const vatType = this.getNodeParameter('vatType', 0) as string;
				const type = this.getNodeParameter('type', 0) as string;
				const date = this.getNodeParameter('date', 0) as string;
				const template = kind === 'invoice' 
					? this.getNodeParameter('template', 0) as string
					: this.getNodeParameter('shipmentTemplate', 0) as string;
				const fromContractorId = this.getNodeParameter('fromContractorId', 0) as number;
				const fromRequisiteId = this.getNodeParameter('fromRequisiteId', 0) as number;
				const toContractorId = this.getNodeParameter('toContractorId', 0) as number;
				const toRequisiteId = this.getNodeParameter('toRequisiteId', 0) as number;
				const toContractorDraft = this.getNodeParameter('toContractorDraft', 0) as string;
				const number = this.getNodeParameter('number', 0) as string;
				const status = this.getNodeParameter('status', 0) as string;
				const comment = this.getNodeParameter('comment', 0) as string;
				const description = this.getNodeParameter('description', 0) as string;
				const modelType = this.getNodeParameter('modelType', 0) as string;
				const modelId = this.getNodeParameter('modelId', 0) as number;
				const items = this.getNodeParameter('items', 0) as string;
				let itemsData;
				try {
					itemsData = JSON.parse(items);
				} catch (error) {
					throw new Error('Неверный формат JSON для товаров и услуг');
				}

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/document`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						kind,
						vat_type: vatType,
						type,
						date,
						template,
						from_contractor_id: fromContractorId,
						from_requisite_id: fromRequisiteId,
						to_contractor_id: toContractorId,
						to_requisite_id: toRequisiteId,
						to_contractor_draft: toContractorDraft,
						number,
						status,
						comment,
						description,
						model_type: modelType,
						model_id: modelId,
					},
					body: {
						items: itemsData,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const documentId = this.getNodeParameter('documentId', 0) as number;
				const type = this.getNodeParameter('type', 0) as string;
				const kind = this.getNodeParameter('kind', 0) as string;
				const date = this.getNodeParameter('date', 0) as string;
				const template = kind === 'invoice' 
					? this.getNodeParameter('template', 0) as string
					: this.getNodeParameter('shipmentTemplate', 0) as string;
				const fromContractorId = this.getNodeParameter('fromContractorId', 0) as number;
				const fromRequisiteId = this.getNodeParameter('fromRequisiteId', 0) as number;
				const toContractorId = this.getNodeParameter('toContractorId', 0) as number;
				const toRequisiteId = this.getNodeParameter('toRequisiteId', 0) as number;
				const toContractorDraft = this.getNodeParameter('toContractorDraft', 0) as string;
				const number = this.getNodeParameter('number', 0) as string;
				const status = this.getNodeParameter('status', 0) as string;
				const comment = this.getNodeParameter('comment', 0) as string;
				const description = this.getNodeParameter('description', 0) as string;
				const modelType = this.getNodeParameter('modelType', 0) as string;
				const modelId = this.getNodeParameter('modelId', 0) as number;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/document/${documentId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						type,
						kind,
						date,
						template,
						from_contractor_id: fromContractorId,
						from_requisite_id: fromRequisiteId,
						to_contractor_id: toContractorId,
						to_requisite_id: toRequisiteId,
						to_contractor_draft: toContractorDraft,
						number,
						status,
						comment,
						description,
						model_type: modelType,
						model_id: modelId,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const documentId = this.getNodeParameter('documentId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/document/${documentId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'getPdf') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const documentId = this.getNodeParameter('documentId', 0) as number;
				const noSign = this.getNodeParameter('noSign', 0) as boolean;

				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/document/${documentId}/pdf/invoice`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/pdf',
					},
					qs: {
						no_sign: noSign,
					},
					encoding: null,
				});
			}
		} else if (resource === 'item') {
			if (operation === 'getAll') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const page = this.getNodeParameter('page', 0) as number;
				const pagesize = this.getNodeParameter('pagesize', 0) as number;
				const query = this.getNodeParameter('query', 0) as string;
				const ids = this.getNodeParameter('ids', 0) as string;

				const qs: {
					page?: number;
					pagesize?: number;
					query?: string;
					ids?: string;
				} = {};

				if (page) qs.page = page;
				if (pagesize) qs.pagesize = pagesize;
				if (query) qs.query = query;
				if (ids) qs.ids = ids;

				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/item`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
					qs,
				});
			} else if (operation === 'get') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const itemId = this.getNodeParameter('itemId', 0) as number;
				responseData = await this.helpers.request({
					method: 'GET',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/item/${itemId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			} else if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const name = this.getNodeParameter('itemName', 0) as string;
				const priceCurrencyId = this.getNodeParameter('priceCurrencyId', 0) as number;
				const type = this.getNodeParameter('itemType', 0) as string;
				const sku = this.getNodeParameter('sku', 0) as string;
				const price = this.getNodeParameter('price', 0) as number;
				const vat = this.getNodeParameter('vat', 0) as number;
				const unitId = this.getNodeParameter('unitId', 0) as number;
				const description = this.getNodeParameter('itemDescription', 0) as string;
				const active = this.getNodeParameter('active', 0) as boolean;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/item`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						price_currency_id: priceCurrencyId,
						type,
						sku,
						price,
						vat,
						unit_id: unitId,
						description,
						active: active.toString(),
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const itemId = this.getNodeParameter('itemId', 0) as number;
				const name = this.getNodeParameter('itemName', 0) as string;
				const priceCurrencyId = this.getNodeParameter('priceCurrencyId', 0) as number;
				const type = this.getNodeParameter('itemType', 0) as string;
				const sku = this.getNodeParameter('sku', 0) as string;
				const price = this.getNodeParameter('price', 0) as number;
				const vat = this.getNodeParameter('vat', 0) as number;
				const unitId = this.getNodeParameter('unitId', 0) as number;
				const description = this.getNodeParameter('itemDescription', 0) as string;
				const active = this.getNodeParameter('active', 0) as boolean;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/item/${itemId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						name,
						price_currency_id: priceCurrencyId,
						type,
						sku,
						price,
						vat,
						unit_id: unitId,
						description,
						active: active.toString(),
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const itemId = this.getNodeParameter('itemId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/item/${itemId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'package') {
			if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const vatType = this.getNodeParameter('vatType', 0) as string;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/package`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						vat_type: vatType,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const packageId = this.getNodeParameter('packageId', 0) as number;
				const vatType = this.getNodeParameter('vatType', 0) as string;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/package/${packageId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						vat_type: vatType,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const packageId = this.getNodeParameter('packageId', 0) as number;
				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/package/${packageId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		} else if (resource === 'packageItem') {
			if (operation === 'create') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const packageId = this.getNodeParameter('packageId', 0) as number;
				const itemId = this.getNodeParameter('itemId', 0) as number;
				const count = this.getNodeParameter('count', 0) as number;
				const price = this.getNodeParameter('price', 0) as number;
				const vat = this.getNodeParameter('vat', 0) as number;

				responseData = await this.helpers.request({
					method: 'POST',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/package/${packageId}/item`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						item_id: itemId,
						count,
						price,
						vat,
					},
				});
			} else if (operation === 'update') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const packageId = this.getNodeParameter('packageId', 0) as number;
				const itemId = this.getNodeParameter('itemId', 0) as number;
				const count = this.getNodeParameter('count', 0) as number;
				const price = this.getNodeParameter('price', 0) as number;
				const vat = this.getNodeParameter('vat', 0) as number;

				responseData = await this.helpers.request({
					method: 'PUT',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/package/${packageId}/item/${itemId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					qs: {
						count,
						price,
						vat,
					},
				});
			} else if (operation === 'delete') {
				if (!credentials.businessId) {
					throw new Error('ID бизнеса не указан в учетных данных');
				}
				const packageId = this.getNodeParameter('packageId', 0) as number;
				const itemId = this.getNodeParameter('itemId', 0) as number;

				responseData = await this.helpers.request({
					method: 'DELETE',
					url: `https://api.finolog.ru/v1/biz/${credentials.businessId}/orders/package/${packageId}/item/${itemId}`,
					headers: {
						'Api-Token': credentials.apiToken as string,
						'Accept': 'application/json',
					},
				});
			}
		}

		// Форматируем ответ в JSON
		if (responseData !== undefined) {
			const parsedData = typeof responseData === 'string' 
				? (() => {
					try {
						return JSON.parse(responseData);
					} catch (error) {
						return responseData;
					}
				})()
				: responseData;

			const jsonResponse = {
				success: true,
				data: parsedData,
				operation: operation,
				resource: resource,
			};

			returnData.push({ json: jsonResponse });
		}

		return [returnData];
	}
}
