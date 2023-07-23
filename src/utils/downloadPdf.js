/** @format */

const downloadPdf = (byteArray, fileName) => {
	const blob = new Blob([byteArray], { type: 'application/pdf' });
	const url = URL.createObjectURL(blob);

	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = fileName || 'document.pdf';
	document.body.appendChild(a);

	a.click();
};

export default downloadPdf;
