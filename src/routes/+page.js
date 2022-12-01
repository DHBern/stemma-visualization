/** @type {import('./$types').PageLoad} */
export async function load() {
	const data = await fetch(`https://api.json-generator.com/templates/hPyY1etCV2s5/data`, {
        headers: {
            'Authorization': `Bearer 6ivroirihy0ekogadh0kbfci2ux77j73e17onxw3`,
        }
    }).then((r) =>
		r.json()
	);

	return {
		items: data
	};
}
