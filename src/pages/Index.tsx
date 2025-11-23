import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);
  const [money, setMoney] = useState(4500);
  const [team, setTeam] = useState<'ct' | 't'>('ct');

  const weapons = [
    { id: 'ak47', name: 'AK-47', price: 2700, damage: 36, type: 'rifle', team: 't' },
    { id: 'm4a4', name: 'M4A4', price: 3100, damage: 33, type: 'rifle', team: 'ct' },
    { id: 'awp', name: 'AWP', price: 4750, damage: 115, type: 'sniper', team: 'both' },
    { id: 'deagle', name: 'Desert Eagle', price: 700, damage: 53, type: 'pistol', team: 'both' },
    { id: 'glock', name: 'Glock-18', price: 0, damage: 28, type: 'pistol', team: 't' },
    { id: 'usp', name: 'USP-S', price: 0, damage: 35, type: 'pistol', team: 'ct' },
  ];

  const equipment = [
    { id: 'kevlar', name: 'Кевлар', price: 650, icon: 'Shield' },
    { id: 'helmet', name: 'Шлем', price: 350, icon: 'Shield' },
    { id: 'defuse', name: 'Набор обезвр.', price: 400, icon: 'Wrench', team: 'ct' },
    { id: 'grenade', name: 'HE граната', price: 300, icon: 'Bomb' },
    { id: 'smoke', name: 'Дымовая', price: 300, icon: 'Cloud' },
    { id: 'flash', name: 'Светошумовая', price: 200, icon: 'Zap' },
  ];

  const buyItem = (price: number, itemName: string) => {
    if (money >= price) {
      setMoney(money - price);
      setSelectedWeapon(itemName);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] pointer-events-none"></div>

      <div className="relative z-10">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon name="Crosshair" size={32} className="text-accent" />
              <h1 className="text-3xl font-bold text-primary">TACTICAL OPS</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Icon name="DollarSign" size={20} className="text-primary" />
                <span className="text-xl font-bold text-primary">${money}</span>
              </div>
              <Badge variant="outline" className="text-sm py-1 px-3">
                <Icon name="Users" size={16} className="mr-1" />
                5v5
              </Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">
                <Icon name="Target" size={16} className="mr-1" />
                Раунд 1/30
              </Badge>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Выбор команды</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={team === 'ct' ? 'default' : 'outline'}
                      onClick={() => setTeam('ct')}
                      className="gap-2"
                    >
                      <Icon name="Shield" size={18} />
                      Спецназ
                    </Button>
                    <Button
                      variant={team === 't' ? 'default' : 'outline'}
                      onClick={() => setTeam('t')}
                      className="gap-2"
                    >
                      <Icon name="Skull" size={18} />
                      Террористы
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="weapons" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="weapons">Оружие</TabsTrigger>
                    <TabsTrigger value="equipment">Снаряжение</TabsTrigger>
                  </TabsList>

                  <TabsContent value="weapons" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {weapons
                        .filter((w) => w.team === team || w.team === 'both')
                        .map((weapon) => (
                          <Card
                            key={weapon.id}
                            className={`p-4 cursor-pointer transition-all hover:border-primary ${
                              selectedWeapon === weapon.name ? 'border-accent' : ''
                            } ${money < weapon.price ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => buyItem(weapon.price, weapon.name)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-bold text-foreground">
                                  {weapon.name}
                                </h3>
                                <Badge variant="secondary" className="mt-1">
                                  {weapon.type}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-primary">
                                  ${weapon.price}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Урон</span>
                                <span className="font-semibold text-foreground">
                                  {weapon.damage}
                                </span>
                              </div>
                              <Progress value={(weapon.damage / 120) * 100} className="h-2" />
                            </div>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="equipment" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {equipment
                        .filter((e) => !e.team || e.team === team)
                        .map((item) => (
                          <Card
                            key={item.id}
                            className={`p-4 cursor-pointer transition-all hover:border-primary ${
                              money < item.price ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            onClick={() => buyItem(item.price, item.name)}
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded bg-secondary flex items-center justify-center">
                                <Icon name={item.icon as any} size={24} className="text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                                <p className="text-xl font-bold text-primary">${item.price}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Мини-карта</h2>
                  <Badge variant="outline">de_dust2</Badge>
                </div>
                <div className="aspect-square bg-secondary rounded border border-border relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full p-4">
                      <div className="w-full h-full border-2 border-primary/30 rounded relative">
                        <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-6 left-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-8 left-6 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-10 left-10 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute top-12 left-12 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>

                        <div className="absolute bottom-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-6 right-8 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-8 right-6 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-10 right-10 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-12 right-12 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <Icon name="Target" size={32} className="text-accent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Спецназ: 5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Террористы: 5</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h2 className="text-xl font-bold mb-4">Выбрано</h2>
                <div className="space-y-3">
                  {selectedWeapon ? (
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded">
                      <Icon name="Crosshair" size={24} className="text-accent" />
                      <div>
                        <p className="font-semibold text-foreground">{selectedWeapon}</p>
                        <p className="text-sm text-muted-foreground">Основное оружие</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-8 bg-secondary/50 rounded border-2 border-dashed border-border">
                      <p className="text-muted-foreground">Выберите оружие</p>
                    </div>
                  )}
                </div>
                <Button className="w-full mt-6 gap-2" size="lg">
                  <Icon name="Play" size={18} />
                  Готов к бою
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
