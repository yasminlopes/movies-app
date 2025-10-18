import { PageHeader } from '../../shared/components/page-header';

export default function MoviesSearch() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Busque por filmes"
        subtitle="Digite pelo menos 2 letras"
      />
    </div>
  );
}
