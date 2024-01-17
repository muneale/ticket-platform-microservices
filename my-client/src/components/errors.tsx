"use client"

interface Params {
  errors: any[]
}

export default function Errors({ errors }: Params) {
  return (
    <div className={`alert alert-danger ${errors.length > 0 ? '' : 'hidden'}`}>
      <h4 className="alert-heading text-xl font-bold">Ooops...</h4>
      <ul className="my-0">
        {errors.map((error, index) => <li key={index}>- {error.message}</li>)}
      </ul>
    </div>
  );
}