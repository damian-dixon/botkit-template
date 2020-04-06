//
// Demo interactive adaptive cards
//
module.exports = function(controller) {

    controller.hears( 'monitor', 'message,direct_message', async ( bot, message ) => {

        if (!controller.public_url) {
            await bot.reply( message, {
                text: 'Please configure the PUBLIC_URL setting to enable this sample feature'
            } );
            return;
        }

        await bot.reply( message, {
            text: 'VM Monitor',
            attachments: [
                {
                    'contentType': 'application/vnd.microsoft.card.adaptive',
                    'content': {
                        'type': 'AdaptiveCard',
    'version': '1.0',
    'body': [
        {
            'type': 'TextBlock',
            'text': 'Transurban WFH Survey',
            'size': 'ExtraLarge',
            'weight': 'Bolder'
        },
        {
            'type': 'TextBlock',
            'text': 'We'd like to know how you're doing working from home. Please complete this short survey to let us know if you need anything.',
            'wrap': true
        },
        {
            'type': 'TextBlock',
            'text': 'Question 1',
            'size': 'Medium'
        },
        {
            'type': 'TextBlock',
            'text': 'Are you able to perform all of your work requirements from home?'
        },
        {
            'type': 'Input.ChoiceSet',
            'placeholder': 'Placeholder text',
            'choices': [
                {
                    'title': 'Yes',
                    'value': 'Yes'
                },
                {
                    'title': 'No',
                    'value': 'No'
                }
            ],
            'style': 'expanded'
        }
    ],
                        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json',
                        'actions': [
                            {
                                'type': 'Action.Submit',
                                'title': 'Submit'
                            }
                        ]
                    }
                }
            ]
        })
    })

    controller.on( 'attachmentActions', async ( bot, message ) => {

        let hostName = message.value.vmlist;

        await bot.reply( message, {
            text: 'Stats',
            attachments: [
                {
                    'contentType': 'application/vnd.microsoft.card.adaptive',
                    'content': {
                        'type': 'AdaptiveCard',
                        'version': '1.0',
                        'body': [
                            {
                                'type': 'ColumnSet',
                                'columns': [
                                    {
                                        'type': 'Column',
                                        'width': 'stretch',
                                        'items': [
                                            {
                                                'type': 'TextBlock',
                                                'text': 'VM Monitor',
                                                'size': 'ExtraLarge',
                                                'weight': 'Bolder',
                                                'horizontalAlignment': 'Center'
                                            },
                                            {
                                                'type': 'TextBlock',
                                                'text': 'Data for Host:'
                                            },
                                            {
                                                'type': 'TextBlock',
                                                'text': `${ hostName }`,
                                                'weight': 'Bolder'
                                            }
                                        ],
                                        'verticalContentAlignment': 'Center',
                                        'horizontalAlignment': 'Center'
                                    },
                                    {
                                        'type': 'Column',
                                        'width': 'stretch',
                                        'items': [
                                            {
                                                'type': 'Image',
                                                'altText': '',
                                                'url': `${controller.public_url}/www/monitor.png`
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                'type': 'Image',
                                'altText': '',
                                'url': `${controller.public_url}/www/stats.png`
                            }
                        ],
                        '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json'
                    }
                }
            ]
        })
    })

    controller.commandHelp.push( { command: 'monitor', text: 'Demo interactive adaptive cards' } );

}
