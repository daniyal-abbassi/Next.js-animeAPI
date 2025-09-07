

export default function Filters() {
    return(
        <fieldset>
            <legend>SFW or NOT ? (adult content)</legend>
            <label htmlFor="sfw-true">True</label>
            <input type="radio" id="sfw-true" name="sfw"  />

            <label htmlFor="sfw-false">True</label>
            <input type="radio" id="sfw-false" name="sfw"  />
        </fieldset>
    )
}