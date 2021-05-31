# tpsi-playground-fabio-cavallero

_Stud. Fabio Cavallero_

###### Correzione verifica Piatti
## Obiettivo:
si vuole gestire una anagrafica di “ricette” (meals) di tutto il mondo basata sui files JSON categoryList.js e details.js.
All’avvio l’applicazione deve eseguire le seguenti operazioni:
- Caricare i nomi di tutte le categoria all’interno di una sequenza di radio buttons così strutturati:
<input type="radio" name="category" value="Breakfast"> <span> Breakfast </span> <br>
- All’avvio il primo radio button (Breakfast) deve essere selezionato e, all’interno della tabella centrale, devono essere visualizzate tutte le relative ricette 
contenute in categoryList.
- Per ogni ricetta vengono visualizzati i tre campi: idMeal, strMeal e strMealThumb (immagine) più una lente per la visualizzazione dei dettagli ed un
pulsante delete per la cancellazione del record corrente. Le tre immagini hanno rispettivamente larghezza 55, 30, 30.
In corrispondenza della selezione di un radio button, la tabella centrale deve visualizzare le ricette relative alla categoria selezionata. In corrispondenza del click
sulla lente occorre visualizzare nel riquadro di destra i dettagli della ricetta, cioè il nome (strMeal in neretto) e le strInstructions reperibili all’interno del file 
details tramite l’utilizzo dell’ID. In corrispondenza del click sul pulsante delete eliminare il record corrente dalla struttura di memoria. Dopo la cancellazione
riaggiornare la tabella centrale. In corrispondenza del click sull’immagine aprire il filmato youtube relativo alla ricetta (contenuto all’interno dei details, campo strYoutube).
