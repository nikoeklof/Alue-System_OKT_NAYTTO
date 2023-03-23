function main(values, type) {
return `
<body style="background-color: #e8e8e8; padding: 25">
    <Container style="width: 85%; display:block; text-align: center; margin: 0 auto">
        <Box
            style="flex-grow: 1;display: flex; border: solid #454545 1px;border-radius: 5px;box-shadow: 3px 2px #bdbdbd">
            <h1 style="color: #454545; font-family: monospace;flex-grow: 1">Alueet - Tuki</h1>
        </Box>
        <div style="padding:20px"></div>
        <p style="color: #454545;font-size: 25px; padding: 5px;font-family: monospace;font-weight: bold">
            Alueen lainaus pyyntö - Alue tiedot</p>
        <Box style="display: block;border: 1px solid #666666;box-shadow: 1px 3px #bdbdbd">
            <Box style="width: 100%;flex-grow: 1;display: flex;border-radius: 5px;">
                <Table style="flex-grow: 1;font-size: 18px;">
                    <tbody>
                        <tr>
                            <td
                                style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;font-weight: bold;text-align: right">
                                Alueen tyyppi:
                            </td>
                            <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px;text-align: left">
                                Kaupunki
                            </td>
                            <td
                                style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Kaupunkin nimi:
                            </td>
                            <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                Mikkeli
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Kaupungin osa:
                            </td>
                            <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px;text-align: left">
                                Kaukola
                            </td>
                            <td
                                style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Katuosoite:
                            </td>
                            <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                Katu 3
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Rakennusten määrä:
                            </td>
                            <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px;text-align: left">
                                10
                            </td>
                            <td
                                style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Omakotitaloja:
                            </td>
                            <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: left">
                                1
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0; font-weight: bold;text-align: right">
                                Kordinaatit:
                            </td>
                            <td
                                style="padding: 5 0 5 0;border: 1px solid #bdbdbd;border-width: 0 1px 1px 1px; font-weight: bold;text-align: right">
                                (lan / lon):
                            </td>
                            <td style="padding: 5 0 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: center">
                                20
                            </td>
                            <td style="padding: 5 0 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 1px;text-align: center">
                                10
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
            <Box style="display:contents">
                <p
                    style="font-weight: bold; font-size: 20px;font-family: monospace;text-decoration:underline;text-decoration-thickness: 2px;text-decoration-color: #bdbdbd;">
                    Muut tiedot
                </p>
                <p style="font-size: 18px;padding: 0 10 0 10">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged.
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                    passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.</p>
            </Box>
        </Box>
        <p style="color: #454545;font-size: 25px; padding: 5px;font-family: monospace;font-weight: bold">
            Huom!</p>
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
                        style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: right;font-weight: bold">
                        Puhelinnumero:
                    </td>
                    <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: left">
                        +000 000 000 0000
                    </td>
                    <td
                        style="padding: 5 5 5 0;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: right;font-weight: bold">
                        Sähköpostiosoite:
                    </td>
                    <td style="padding: 5 0 5 5;border: 1px solid #bdbdbd;border-width: 0 0 1px 0;text-align: left">
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