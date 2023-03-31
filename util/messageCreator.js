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
                max-width: 750px
            }
    
            #compress {
                display: inline;
            }
    
            #ultra {
                display: inline;
                max-height: 4px;
            }
    
            #noPadding {
                padding: 0px;
            }
    
            td {
                margin: 2px auto;
                padding: 2px
            }
    
            h2 {
                color: #454545;
                font-family: monospace;
                font-weight: bold;
                font-size: 20px;
                margin: 2px
            }
    
            h3 {
                font-weight: bold;
                font-size: 16px;
                margin: 0;
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
                    max-height: 30px;
                }
    
                @media (max-width:600px) {
                    body {
                        width: 500px
                    }
    
                    #longText {
                        max-width: 500px
                    }
                }
    
                @media (max-width:500px) {
                    body {
                        width: 300px
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
                    <td>
                        <Table>
                            <tr>
                                <td>
                                    <Table>
                                        <tr>
                                            <h2>Alueet - Tuki</h2>
                                        </tr>
                                        <tr>
                                            <h2>${header} - Alue tiedot</h2>
                                        </tr>
                                    </Table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Table id="compress">
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Kaupunkin nimi:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                ${area.cityName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Kaupungin osa:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                ${area.quarter}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Katuosoite:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                ${area.address}
                                            </td>
                                        </tr>
                                    </Table>
                                    <Table id="compress">
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Alueen tyyppi:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                ${area.type}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Rakennusten määrä:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                ${area.buildings}
                                            </td>
    
                                        </tr>
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Omakotitaloja:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                ${area.homes}
                                            </td>
                                        </tr>
                                    </Table>
                                </td>
                            </tr>
                            <tr>
                                <td id="noPadding">
                                    <Table>
                                        <tr>
                                            <td id="noPadding">
                                                <Table id="ultra">
                                                    <tr>
                                                        <td id="noPadding">
                                                            <h3>Kordinaatit:</h3>
                                                        </td>
                                                    </tr>
                                                </Table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td id="noPadding">
                                                <Table id="ultra">
                                                    <tr>
                                                        <td id="noPadding">
                                                            <p><b>Lat: </b>${area.map.coordinates.lan}</p>
                                                        </td>
                                                    </tr>
                                                </Table>
                                                <Table id="ultra">
                                                    <tr>
                                                        <td id="noPadding">
                                                            <p><b>Lng: </b>${area.map.coordinates.lon}</p>
                                                        </td>
                                                    </tr>
                                                </Table>
                                            </td>
                                        </tr>
                                    </Table>
                                </td>
                            </tr>
                        </Table>
                    </td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <h2>
                                        Muut tiedot
                                    </h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p id="longText">${area.misc}</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <h2 style="text-decoration: underline #454545 1px;">Huom!</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p id="longText">
                                        Jos et pyytänyt tätä aluetta lorem ipsum dolor sit amet, consectetur adipiscing
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
                            <tr>
                                <td>
                                    <Table id="ultra">
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Puhelinnumero:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                <p>+000 000 000 0000</p>
                                            </td>
                                        </tr>
                                    </Table>
                                    <Table id="ultra">
                                        <tr>
                                            <td style="text-align: right">
                                                <h3>Sähköpostiosoite:</h3>
                                            </td>
                                            <td style="text-align: left">
                                                <p>loremipsum@mail.net</p>
                                            </td>
                                        </tr>
                                    </Table>
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