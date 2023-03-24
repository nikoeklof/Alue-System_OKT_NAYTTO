function main(area, header) {
    return `
<body style="background-color: #e8e8e8; padding: 25">
    <Container style="width: 85%; display:block; text-align: center; margin: 0 auto">
        <Box
            style="flex-grow: 1;display: flex; border: solid #454545 1px;border-radius: 5px;box-shadow: 3px 2px #bdbdbd">
            <h1 style="color: #454545; font-family: monospace;flex-grow: 1">Alueet - Tuki</h1>
        </Box>
        <div style="padding:20px"></div>
        <p style="color: #454545;font-size: 25px; padding: 5px;font-family: monospace;font-weight: bold">
            ${header} - Alue tiedot</p>
        <Box style="display: block;border: 1px solid #666666;box-shadow: 1px 3px #bdbdbd">
            <Box style="width: 100%;flex-grow: 1;display: flex;border-radius: 5px;">
                <Table style="flex-grow: 1;font-size: 18px;">
                    <tbody>
                        <tr>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;font-weight: bold;text-align: right">
                                Alueen tyyppi:
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px;text-align: left">
                                ${area.type}
                            </td>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Kaupunkin nimi:
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                ${area.cityName}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Kaupungin osa:
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px;text-align: left">
                                ${area.quarter}
                            </td>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Katuosoite:
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                ${area.address}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Rakennusten määrä:
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px;text-align: left">
                                ${area.buildings}
                            </td>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Omakotitaloja:
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                ${area.homes}
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Kordinaatit:
                            </td>
                            <td
                                style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px; font-weight: bold;text-align: right">
                                (lan / lon):
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: center">
                                ${area.map.coordinates.lan}
                            </td>
                            <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: center">
                                ${area.map.coordinates.lon}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
            <Box style="display:contents">
                <p style="color: #454545;font-size: 20px; padding: 5px;font-family: monospace;font-weight: bold">
                    Muut tiedot
                </p>
                <p style="font-size: 18px;padding: 0 10 0 10">
                ${area.misc}</p>
            </Box>
        </Box>
        <p style="font-weight: bold; font-size: 25px;font-family: monospace;text-decoration:underline;text-decoration-thickness: 2px;text-decoration-color: #bdbdbd">
            Huom!
        </p>
        <Box style="display:contents">
            <p style="font-size: 18px;padding: 0 10 0 10">
                Jos et pyytänyt tätä aluetta lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Pulvinar sapien et ligula ullamcorper. Augue
                interdum velit euismod in pellentesque. Accumsan lacus vel facilisis volutpat. Aliquet enim tortor at
                auctor urna nunc id cursus. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant
                morbi. Facilisis leo vel fringilla est ullamcorper eget nulla. Lectus nulla at volutpat diam. Nunc sed
                augue lacus viverra. Egestas purus viverra accumsan in. Arcu dictum varius duis at consectetur lorem
                donec massa sapien.</p>
        </Box>
        <Box style="width: 100%;flex-grow: 1;display: flex;border-radius: 5px;">
            <Table style="flex-grow: 1;font-size: 18px; font-family: monospace">
                <tr>
                    <td
                        style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: right;font-weight: bold">
                        Puhelinnumero:
                    </td>
                    <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: left">
                        +000 000 000 0000
                    </td>
                </tr>
                <tr>
                    <td
                        style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: right;font-weight: bold">
                        Sähköpostiosoite:
                    </td>
                    <td style="padding: 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: left">
                        loremipsum@mail.net
                    </td>
                </tr>
            </Table>
        </Box>
    </Container>
</body>
`
}

module.exports = main