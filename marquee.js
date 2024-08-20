function makeMarquee() {
    const title = 'Bobby Joe Smith III is a Black and Indigenous (Lakota) graphic designer and media artist living on the unceded ancestral lands of the Tongva, Tataviam, Serrano, Kizh, and Chumash peoples commonly referred to as Los Angeles. His creative practice is a poetic discourse on the utilization of art and design to further anti - colonial movements and achieve decolonial outcomes. He studied graphic design at the Maryland Institute College of Art(Post - Bacc) and the Rhode Island School of Design(MFA), and received an MFA in Media Art from the University of California—Los Angeles.';

    // an array constructor which creates a new empty array with 50 slots
    // the fill method will populate the array with specified items
    // join method joins together all of the elements in the array into one text string with a specified delineator
    const marqueeText = new Array(10).fill(title).join(' — ');

    // 1. grab our marquee span from the html
    // 2. we want to set our repeating title as the content
    const marquee = document.querySelector('.marquee span');
    marquee.innerHTML = marqueeText;

}

makeMarquee();