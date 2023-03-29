function main(area, header) {
    const message = `
        < body style = "background-color: #e8e8e8; padding: 25" >
            <Container style="width: 85%; display:block; text-align: center; margin: 0 auto">
                <Box style="display: block; margin: 0 auto; border: solid #454545 1px; max-width: 500px;">
                    <h1 style="color: #454545; font-family: monospace;flex-grow: 1">Alueet - Tuki</h1>
                </Box>
                <div style="padding:20px"></div>
                <p style="color: #454545;font-size: 25px; padding: 5px;font-family: monospace;font-weight: bold">
                ${header} - Alue tiedot</p>
                <Box style="display: block;border: 1px solid #666666;">
                    <Box style="display: inline;border-radius: 5px;">
                        <Table style="font-size: 18px; display: inline;">
                            <tr>
                                <td
                                    style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 0;font-weight: bold;text-align: right">
                                    Alueen tyyppi:
                                </td>
                                <td style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                    ${area.type}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                    Kaupungin osa:
                                </td>
                                <td style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                    ${area.quarter}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                    Rakennusten määrä:
                                </td>
                                <td style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                    ${area.buildings}
                                </td>
                            </tr>
                        </Table>
                        <Table style="font-size: 18px; display: inline;">
                            <tr>
                                <td
                                    style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                    Kaupunkin nimi:
                                </td>
                                <td style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                    ${area.cityName}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                    Katuosoite:
                                </td>
                                <td style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                    ${area.address}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                    Omakotitaloja:
                                </td>
                                <td style="padding: 8;border: solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                    ${area.homes}
                                </td>
                            </tr>
                        </Table>
                        <Box style="display: block;border-radius: 5px; font-size: 18px; margin: 0;">
                            <Box
                                style="display: block; padding: 8; border: solid #bdbdbd; border-width: 0 0 1 0; font-weight: bold; margin: 0 auto; max-width: 250px;">
                                Kordinaatit:
                            </Box>
                            <Box style="display: inline-block; padding: 0 8 0 0;">
                                <p style="font-weight: bold; margin: 8;">lat:</p> ${area.map.coordinates.lan}
                            </Box>
                            <Box style="display: inline-block; padding: 0 0 0 8;">
                                <p style="font-weight: bold; margin: 8;">lng:</p> ${area.map.coordinates.lon}
                            </Box>
                        </Box>
                    </Box>`

    if (area.misc)
        message += `
                    <Box style="display:contents">
                        <p style="font-weight: bold; font-size: 20px;font-family: monospace">
                            Muut tiedot
                        </p>
                        <p style="font-size: 18px;padding: 0 10 0 10">${area.misc}</p>
                    </Box>
                    `

    message += `
                </Box >
                <p
                    style="color: #454545;font-size: 25px; padding: 5px;font-family: monospace;font-weight: bold;text-decoration:underline;text-decoration-thickness: 2px;text-decoration-color: #bdbdbd;">
                    Huom!</p>
                <Box style="display:contents">
                    <p style="font-size: 18px;padding: 0 10 0 10">
                        Jos et pyytänyt tätä aluetta lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Pulvinar sapien et ligula ullamcorper.
                        Augue
                        interdum velit euismod in pellentesque. Accumsan lacus vel facilisis volutpat. Aliquet enim
                        tortor at
                        auctor urna nunc id cursus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque
                        habitant
                        morbi. Facilisis leo vel fringilla est ullamcorper eget nulla. Lectus nulla at volutpat
                        diam. Nunc sed
                        augue lacus viverra. Egestas purus viverra accumsan in. Arcu dictum varius duis at
                        consectetur lorem
                        donec massa sapien.</p>
                </Box>
                <Box style="width: 100%;display: inline-block;border-radius: 5px;">
                    <Table style="font-size: 18px; font-family: monospace; display: inline;padding: 5">
                        <td
                            style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: right;font-weight: bold">
                            Puhelinnumero:
                        </td>
                        <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: left">
                            +000 000 000 0000
                        </td>
                    </Table>
                    <Table style="font-size: 18px; font-family: monospace;display: inline;padding: 5">
                        <td
                            style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: right;font-weight: bold">
                            Sähköpostiosoite:
                        </td>
                        <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: left">
                            loremipsum@mail.net
                        </td>
                    </Table>
                </Box>
            </Container >
        </body >
        `

    return message
}

module.exports = main