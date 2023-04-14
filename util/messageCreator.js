function main(area, header) {
    if (!area.misc || area.misc == null)
        area.misc = "Tällä alueella ei ole lisätietoja"

    let message = `
    <!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                box-sizing: border-box;
            }
    
            body {
                width: 800px;
                align-self: center;
                align-items: center;
                font-size: 16px;
                padding: 0 0 10px 0;
                text-align: center;
                background-color: #e8e8e8;
                margin: 0 auto;
            }
    
            table {
                margin: 2px;
                margin-left: auto;
                margin-right: auto;
            }
    
            #longText {
                max-width: 750px;
            }
    
            #compress {
                display: inline;
            }
    
            #unwide {
                display: inline-block;
                height: 5px;
            }
    
            #ultra {
                display: inline;
            }
    
            #item {
                padding: 2px;
            }
    
            td {
                margin: 2px auto;
                padding: 0px
            }
    
            h2 {
                color: #454545;
                font-family: monospace;
                font-weight: bold;
                font-size: 20px;
                margin: 2px;
            }
    
            #centerHeader {
                display: flex;
                align-self: center;
                align-items: center;
            }
    
            h3 {
                font-weight: bold;
                font-size: 16px;
                margin: 0px;
            }
    
            @media (max-width:800px) {
                body {
                    width: 600px
                }
    
                #longtext {
                    max-width: 500px
                }
    
                h2 {
                    font-size: 18px;
                    color: black;
                }
    
                #compress {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
    
                #ultra {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    padding: 0;
                    max-height: 25px;
                }
    
                #unwide {
                    display: inline-block;
                    height: 12px;
                }
    
                @media (max-width:600px) {
                    body {
                        max-width: 500px
                    }
    
                    #longText {
                        max-width: 500px
                    }
                }
    
                @media (max-width:500px) {
                    body {
                        max-width: 300px
                    }
    
                    #longText {
                        max-width: 280px
                    }
                }
            }
        </style>
    </head>
    
    <body>
        <Table>
            <tbody>
                <tr>
                    <Table>
                        <tr>
                            <td>
                                <Table>
                                    <tr id="centerHeader">
                                        <h2>Alueet Tuki</h2>
                                    </tr>
                                    <tr id="centerHeader">
                                        <h2>${header}</h2>
                                    </tr>
                                </Table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p></p>
                            </td>
                        </tr>
                        <tr id="centerHeader">
                            <td>
                                <h2>Alue tiedot</h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Table id="compress">
                                    <tr>
                                        <td style="text-align: right" id="item">
                                            <h3>Kaupunkin nimi:</h3>
                                        </td>
                                        <td style="text-align: left" id="item">
                                            ${area.cityName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right" id="item">
                                            <h3>Kaupungin osa:</h3>
                                        </td>
                                        <td style="text-align: left" id="item">
                                            ${area.quarter}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right" id="item">
                                            <h3>Katuosoite:</h3>
                                        </td>
                                        <td style="text-align: left" id="item">
                                            ${area.address}
                                        </td>
                                    </tr>
                                </Table>
                                <Table id="compress">
                                    <tr>
                                        <td style="text-align: right" id="item">
                                            <h3>Alueen tyyppi:</h3>
                                        </td>
                                        <td style="text-align: left" id="item">
                                            ${area.type}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: right" id="item">
                                            <h3>Rakennusten määrä:</h3>
                                        </td>
                                        <td style="text-align: left" id="item">
                                            ${area.buildings}
                                        </td>
                                    </tr>
                                </Table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tr id="centerHeader">
                                        <td>
                                            <h3>
                                                Muut alueeseen liittyvät tiedot:
                                            </h3>
                                        </td>
                                    </tr>
                                    <tr id="centerHeader">
                                        <td>
                                            <p id="longText">${area.misc}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </Table>
                </tr>
                <tr>
                    <td>
                        <p></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr id="centerHeader">
                                <td>
                                    <h2 style="text-decoration: underline #454545 1px;">Huom! Jos et ole pyytänyt tätäaluetta</h2>
                                </td>
                            </tr>
                            <tr id="centerHeader">
                                <td>
                                    <p id="longText">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                        elit,
                                        sed do
                                        eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Pulvinar sapien et ligula
                                        ullamcorper.
                                        Augue
                                        interdum velit euismod in pellentesque. Accumsan lacus vel facilisis volutpat.
                                        Aliquet
                                        enim
                                        tortor at
                                        auctor urna nunc id cursus. Vel elit scelerisque mauris pellentesque pulvinar
                                        pellentesque
                                        habitant
                                        morbi. Facilisis leo vel fringilla est ullamcorper eget nulla. Lectus nulla at
                                        volutpat
                                        diam. Nunc sed
                                        augue lacus viverra. Egestas purus viverra accumsan in. Arcu dictum varius duis at
                                        consectetur lorem
                                        donec massa sapien.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr id="centerHeader">
                                <td>
                                    <h2>Yhteistiedot</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <Table id="ultra">
                                                    <tr>
                                                        <td style="text-align: right" id="item">
                                                            <h3>Puhelinnumero:</h3>
                                                        </td>
                                                        <td style="text-align: left" id="item">
                                                            <p>+000 000 000 0000</p>
                                                        </td>
                                                    </tr>
                                                </Table>
                                                <Table id="ultra">
                                                    <tr>
                                                        <td style="text-align: right" id="item">
                                                            <h3>Sähköpostiosoite:</h3>
                                                        </td>
                                                        <td style="text-align: left" id="item">
                                                            <p>loremipsum@mail.net</p>
                                                        </td>
                                                    </tr>
                                                </Table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </Table>
    </body>
    
    </html>
    `

    return message
}

module.exports = main