import Header from "@/components/header";
import Link from "next/link";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Sobre Nós</h1>
          <p className="text-gray-600 mb-6">
            Na Viação Graciosa, usamos nossa expertise no transporte rodoviário
            para oferecer diversos serviços de qualidade aos nossos clientes.
            Realizamos a entrega de encomendas e o transporte de cargas de
            maneira eficiente, utilizando ônibus e caminhões para garantir
            segurança e rapidez em todo o litoral paranaense. Nós também
            oferecemos o serviço de fretamento de ônibus para turismo, eventos,
            congressos, city-tours, entre outros, com motoristas experientes,
            itens de conforto e a opção de micro-ônibus.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Nossa Missão
              </h2>
              <p className="text-gray-600 mb-6">
                Nossa missão é transportar com segurança, conforto e
                pontualidade, sempre buscando ser melhores a cada dia.
              </p>
              <Link
                href="https://api.whatsapp.com/send?phone=5541999723355"
                className="bg-graciosa text-white p-2 rounded-md hover:brightness-125 transition duration-75 mt-6 block text-center"
                target="_blank"
              >
                Entre em contato pelo Whatsapp
              </Link>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-0">
                Nossa Visão
              </h2>
              <p className="text-gray-600">
                Ser reconhecida pela excelência na prestação de serviços de
                mobilidade, oferecendo qualidade, agilidade, rapidez e
                responsabilidade corporativa. Visamos proporcionar satisfação a
                clientes, funcionários, investidores e à sociedade, gerando
                resultados positivos e orgulho para todos que fazem parte da
                nossa história.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
